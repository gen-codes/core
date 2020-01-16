import combineGenerators from "./combine";
import hb from "handlebars";
import helpers from "./helpers"
import {flattenFileTree} from "./utils/flattenFileTree";
import {compile} from "./compile";
import {getSourceContext} from "./utils/getSourceContext";
import generateHandlebarsTemplate from "./generateHandlebarsTemplate";
import cli from "./cli"
import {getRegexResults} from "./utils/getRegexResults";
import fs from "fs-extra"
import bindFunction from "./utils/bindFunction";
import {normalize, schema} from 'normalizr';
// cli()
// import mergeCodeTest from "./mergeCodeTest"

function inlinePartials(component, generator) {
  const partials = getRegexResults(/\{\{\> (?<name>[a-z0-9]*) (?<args>.*?)\}\}/gmi, component);
  // component.match(/\{\{\>(.*?) (.*?)\}\}/gmi)
  for(const partial of partials) {
    const args = partial.args.split(" ");
    let inlinePartial = generator.components[partial.name];
    for(const arg of args) {
      inlinePartial = `{{with ${arg}}}${inlinePartial}{{/with}}`;
    }
    component = component.replace(partial.fullText, inlinePartial);
  }
  return component;
}
function inlineDynamicPartials(component, generator) {
  const partials = getRegexResults(/\{\{\> \(dynamicPartial "(?<type>[a-z0-9]*)" (?<subType>.*?)\) (?<args>.*?)\}\}/gmi, component);
  // component.match(/\{\{\>(.*?) (.*?)\}\}/gmi)
  for(const partial of partials) {
    const args = partial.args.split(" ");
    let inlinePartial = Object.keys(generator.components)
      .filter(comp => comp.startsWith(partial.type))
      .reduce((allCases, comp) => `${allCases}{{case "${comp.replace(partial.type, "")}"}}${generator.components[comp]}{{/case}}`, "")
    inlinePartial = `{{switch ${partial.subType}}}${inlinePartial}{{/switch}}`
    for(const arg of args) {
      inlinePartial = `{{with ${arg}}}${inlinePartial}{{/with}}`;
    }
    component = component.replace(partial.fullText, inlinePartial);
  }
  return component;
}

const normalizeSchemas = (schemas) => {
  const newSchema = {}
  for(const schemaName in schemas) {

    if(schemaName.match(/^[A-Z]/) && schemas[schemaName].properties) {
      newSchema[schemaName] = {}
      for(const propName in schemas[schemaName].properties) {
        if(propName.startsWith("if(")){
          newSchema[schemaName] = {...newSchema[schemaName],...schemas[schemaName].properties[propName] }
        }else{
          newSchema[schemaName][propName] = schemas[schemaName].properties[propName]
        }
      }
    }
  }
  for(const schemaName  in newSchema){
    for(const propName in newSchema[schemaName]) {
      if(typeof (newSchema[schemaName][propName]) === "string") {
        newSchema[schemaName][propName] = {
          type: newSchema[schemaName][propName]
        }
      }
    }
  }
  return newSchema
}

const normalizrSchema = (root, schemas, plurals) => {
  let plural = false
  if(plurals[root]) {
    plural = true
    root = plurals[root]
  }
  if(!schemas[root]){
    // console.log(root, " not found")
    return null
  }
  const properties = schemas[root]
  const entity = new schema.Entity(root, Object.keys(properties)
    .reduce((entityProps, propName) => {
      const prop = properties[propName]
      if(prop.type.match(/^[A-Z]/)) {
        entityProps[propName] = normalizrSchema(prop.type, schemas, plurals)
      }
      return entityProps
    }, {}), {
      idAttribute: '_id'})
  if(plural) {
    return [entity]
  }
  return entity
}

const getPluralRelations = (schemas) => {
  const pluralRelations = {}
  for(const schemaName in schemas) {
    if(schemaName.match(/^[A-Z]/)) {
      pluralRelations[schemas[schemaName].plural] = schemaName
    }
  }
  return pluralRelations
}
export default function run(config, context) {

  const generator = combineGenerators(config)
  // console.log(generator)
  const normalPropertySchemas = normalizeSchemas(generator.schema)
  const plurals = getPluralRelations(generator.schema)
  // console.log(Object.keys(generator.schema))
  const nSchema = normalizrSchema("Root", normalPropertySchemas, plurals)
  // console.log(JSON.stringify(nSchema, null, 2))

  // console.log(normalize(context, nSchema))
  // for (const schemaName in generator.schema){
  //   const schemaValue = generator.schema[schemaName]
  //   nSchema[schemaName] = schema.Entity(schemaValue.plural)
  //   nSchema[schemaValue.plural] = schema.Array()
  // }
  for(const componentName in generator.components) {
    let component = generator.components[componentName]
    component = inlinePartials(component, generator);
    component = inlineDynamicPartials(component, generator);
    generator.components[componentName] = component
  }
  for(const fileName in generator.files) {
    let file = generator.files[fileName]
    file = inlinePartials(file, generator)
    file = inlineDynamicPartials(file, generator)
    generator.files[fileName] = file
  }
  // console.log(generator.components)
  // for(const fileName in generator.files){
  //   generator.files[fileName] = generateHandlebarsTemplate(generator.files[fileName])
  // }
  // for(const componentName in generator.components){
  //   generator.components[componentName] = generateHandlebarsTemplate(generator.components[componentName])
  // }
  for(const helperName in generator.helpers) {
    const helper = generator.helpers[helperName]
    // console.log(helper)
    generator.helpers[helperName] = (data, ...args) => {
      // console.log(data)
      return helper(data, ...args)

    }
  }
  // console.log(generator.helpers)
  for(let componentName in generator.components) {
    hb.registerPartial(
      componentName,
      generator.components[componentName]
    )
  }
  let reverseCase = {}
  const memoize = fn => { //1
    let cache = {}; // 2
    return function(...args) { //3
      let stringifiedArgs = JSON.stringify(args);//4

      // console.log(fn, args[0])
      let result = cache[stringifiedArgs] = cache[stringifiedArgs] || fn.bind(this)(...args); //5
      if(fn.name.includes("Case"))
        reverseCase[result] = args[0]

      return result;//6
    };
  };
  // bindFunction()
  let allHelpers = {...helpers, ...generator.helpers}
  for(const helperName in allHelpers) {
    const helper = allHelpers[helperName]
    // console.log(helper)
    allHelpers[helperName] = memoize(helper)
  }
  hb.registerHelper(allHelpers);


  // console.log(Object.keys(generator.files), Object.keys(generator.components))
  // generator._source_map = getSourceContext(context)
  const files = compile(
    generator.fileTree, {},
    context, "src/app",
    generator
  )
  // const files = compile(
  //   generator.fileTree, {},
  //   {...getSourceContext(context, "_source_map"),
  //   _context: context}, "src/app",
  //   generator
  // )
  // const sourceFiles = flattenFileTree(sourceMap)
  // const sourceFiles = flattenFileTree(files)
  // const sourceMapRegex = /(\$[a-z0-9]+\$\$(.*?)\$\$[a-z0-9]+\$)+/gm
  const sourceMapRegex = /\/\*--(.*?)--\*\//gmi

  // for(let fileName in sourceFiles){
  //   let sourceFile = sourceFiles[fileName]
  //   const variables = sourceFile.match(sourceMapRegex)
  //   if(variables){
  //     for(let vName of variables){
  //       console.log( vName, sourceFile.replace(vName, ""))
  //     }
  //   }
  //   // console.log(fileName, sourceFile.match(sourceMapRegex))
  // }
  // console.log("TCL: run -> fs", sourceFiles)
  // console.log(sourceFile)
  // console.log(sourceFile.match(sourceMapRegex))
  const flattenedFiles = flattenFileTree(files)
  if(config.output) {
    for(const fileName in flattenedFiles) {
      fs.outputFileSync(`${config.output}${fileName}`, flattenedFiles[fileName])
    }

  }
  console.log(
    // generator
    // flattenFileTree(files),
    // reverseCase
    // flattenFileTree(sourceMap),
    // JSON.stringify(files, null, 2)
  )
  // while (true){

  // }
  return generator
}




const metaCode = `
import somethoing
/*item_x1*/import /*item_x1_name*/Model/*_item_x1_name*/ from "../scema//*item_x1_name*/Model/*_item_x1_name*/"/*_item_x1*/
/*item_x2*/import /*item_x2_name*/Book/*_item_x2_name*/ from "../scema//*item_x2_name*/Book/*_item_x2_name*/"/*_item_x2*/

/*item_x1*/const /*item_x1_name*/Model/*_item_x1_name*/ = 0
for(nitem in items){
  if(some){
    return /*item_x1_type*/string/*_item_x1_type*/
  }
}/*_item_x1*/
/*item_x2*/const /*item_x2_name*/Model/*_item_x2_name*/ = 0
for(nitem in items){
  if(some){
    return /*item_x2_type*/number/*_item_x2_type*/
  }
}
/*_item_x2*/
const random = 120020
`

import flat from "flat";
import changeCase from "change-case";
import Handlebars from 'handlebars';

const types = [
  "MustacheStatement",
  "BlockStatement",
  "Program",
  "PartialStatement",
  "Hash",
  "PathExpression",
  "HashPair",
  "StringLiteral"
];

function clean(json) {
  // console.log(json);
  if (!json || !types.includes(json.type)) {
    return null;
  }
  delete json.strip;
  delete json.loc;
  delete json.depth;
  delete json.loc;
  delete json.data;
  delete json.escaped;
  delete json.openStrip;
  delete json.closeStrip;
  delete json.type;
  delete json.parts;
  if (json.path) {
    json.path = clean(json.path);
  }
  if (json.program) {
    json.program = clean(json.program);
  }

  if (json.body) {
    json.body = json.body.map(clean).filter(v => v !== null);
    // .map(flat);
  }
  if (json.params) {
    json.params = json.params.map(clean).filter(v => v != null);
    // .map(flat);
  }
  if (json.pairs) {
    json.pairs = json.pairs.map(clean).filter(v => v != null);
    // .map(flat);
  }
  if (json.name) {
    json.name = clean(json.name);
  }
  if (json.value) {
    json.value = clean(json.value);
  }
  if (json.hash) {
    json.hash = clean(json.hash);
  }
  for (let key in json) {
    if (
      json[key] === null ||
      json[key] === undefined ||
      json[key].length === 0 ||
      Object.keys(json[key]).length === 0 ||
      json[key] === "getValue"
    ) {
      delete json[key];
    } else if (Array.isArray(json[key])) {
      json[key] = json[key].map(v =>
        typeof v === "object" ? flat(v, { maxDepth: 3 }) : v
      );
    }
  }
  return json;
}

function reformat(schema, json) {
  if(!json.body) return schema
  const block = "path.original";
  const param1 = "params.0.original";
  const ifCheck = "params.1.original";
  const param3 = "params.2.original";
  const eachBody = "program.body.0";
  const ifBody = "program.body.0";

  const eachParam = "program.blockParams.0";
  json.body.forEach(item => {
    if (item[param1]) {
      const [keyName, field] = item[param1].split(".");
      const key = changeCase.pascalCase(keyName);
      if (key && field) {
        if (!schema[key]) {
          schema[key] = {};
        }
        if (!schema[key].properties) {
          schema[key].properties={};
        }
        if (!schema[key].properties[field]) {
          schema[key].properties[field] = {type: "string"};
        }
        if (item[block] === "each") {
          const defName = changeCase.pascalCase(item[eachParam]);
          if (!schema[defName]) schema[defName] = {};
          schema[defName].plural = changeCase.pascalCase(field);
          schema[key].properties[field] = changeCase.pascalCase(field);
        } else if (item[block] === "custom_if" && item[ifCheck] === "equals") {
          if (!schema[key].properties[field]) schema[key].properties[field] = {type: "string", enum: []};
          if (!schema[key].properties[field].enum) schema[key].properties[field].enum = [];
          schema[key].properties[field].enum.push(item[param3]);
        } else if (item[block] === "switch") {
          if (!schema[key].properties[field].enum) schema[key].properties[field].enum = [];
          for (let jkey in item) {
            if (jkey.match(/program.body/)) {
              schema[key].properties[field].enum = schema[key].properties[field].enum.concat(
                item[jkey][param1].split("|")
              );
            }
          }
        }
        if(schema[key].properties[field].enum){
          schema[key].properties[field].enum = Array.from(new Set(schema[key].properties[field].enum))
        }
      }
      let newJson = { body: [] };
      for (let ikey in item) {
        if (ikey.match(/program.body/)) {
          newJson.body.push(item[ikey]);
        }
      }
      schema = reformat(schema, newJson);
    }
  });
  return schema;
}
const generateSchema = (schema, template, filename) => {
  const ast = Handlebars.parse(template)
  const flatAst = clean(ast);
  const formatted = reformat(schema, flatAst);

  return formatted
}
export default generateSchema;
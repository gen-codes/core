import fs from "fs"
import {dirname} from "path"
import {parse} from "url";
import toAst from "to-ast";
import escodegen from "escodegen";
import {parseGenerator} from "./parseGenerator";
import {applyPlugin} from "./utils/applyPlugin";
import {mergeWithPlugins} from "./utils/mergeWithPlugins";
import {mergeGenerators} from "./mergeGenerators";

const combine = ({
  prefix,
  generators,
  plugins,
  template
}) => {

  const generatorData = generators
    .map(g => `${prefix}/generators/${g}`)
    .map(parseGenerator)
    .reduce((genData, gen, index) => {
      genData[generators[index]] = gen
      return genData
    }, {})
  const pluggedGenerators  = mergeWithPlugins(generatorData)
  plugins.forEach((pluginName) => {
    const subPlugins = fs.readdirSync(`${prefix}/plugins/${pluginName}`)
      .filter(subPluginName => generators.includes(subPluginName))
      .forEach(subPluginName=>{
        pluggedGenerators[subPluginName] = applyPlugin(
          pluggedGenerators[subPluginName],
          parseGenerator(`${prefix}/plugins/${pluginName}/${subPluginName}`)
        )
      })

  })
  const templateData = template
  .map(g => `${prefix}/templates/${g}`)
  .map(parseGenerator)
  .reduce((genData, gen, index) => {
    genData[template[index]] = gen
    return genData
  }, {})
  // console.log(templateData)
  const mergedGenerator = mergeGenerators({...pluggedGenerators, ...templateData})
  return mergedGenerator
  // console.log(
  //   JSON.stringify(mergedGenerator, null, 2)
  // )
}
export default combine;

import {applyPlugin} from "./applyPlugin";
export function mergeWithPlugins(generatorData) {
  const generators = Object.keys(generatorData);
  const pluggedGenerators = Object.values(generatorData)
    .map((generator, index) => {
      // console.log("TCL: mergeGenerators -> generator", generator)
      let pluggedGenerator = generator;
      if(generator.plugins) {
        const pluginNames = Object.keys(generator.plugins);
        pluginNames
          .filter(plugin => generators.includes(plugin))
          .forEach((pluginName) => {
            pluggedGenerator = applyPlugin(generator, generatorData[generators[index]].plugins[pluginName]);
          });
      }
      return pluggedGenerator;
    }).reduce((pluggedGeneratorData, generator, index) => {
      return {
        ...pluggedGeneratorData,
        [generators[index]]: generator
      };
    }, {});
  return pluggedGenerators;
}

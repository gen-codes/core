import {mergeDeep} from "../mergeDeep";
import {mergeFile} from "../mergeFile";
export function applyPlugin(generator, plugin) {
  // console.log(plugin)
  generator = mergeDeep(generator, plugin); // the last is stronger
  for(let compFileName in plugin.extensions) {
    const compName = compFileName.split(".")[0];
    const comp = plugin.extensions[compFileName];
    if(generator.files) {
      for(let file in generator.files) {
        const fileContent = generator.files[file];
        generator.files[file] = mergeFile(fileContent, comp, compName);
      }
    }
    if(generator.components) {
      for(let file in generator.components) {
        const fileContent = generator.components[file];
        generator.components[file] = mergeFile(fileContent, comp, compName);
      }
    }
  }
  return generator;
}

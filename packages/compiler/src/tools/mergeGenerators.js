import {mergeDeep} from "./mergeDeep";
export function mergeGenerators(generatorData) {
  const mergedGenerator = mergeDeep(...Object.values(generatorData));
  delete mergedGenerator.plugins;
  delete mergedGenerator.extensions;
  return mergedGenerator;
}

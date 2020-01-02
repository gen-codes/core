export function mergeFile(file, component, name) {
  return file.replace(new RegExp(`{>= ${name}}`, "g"), `${component}\n{>= ${name}}`);
}

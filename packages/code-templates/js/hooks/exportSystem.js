/* ES6 specific export system
  made for the MERN Template needs of GenCodeZ
*/

function execRegex(regexStatement, targetText) {

  /* Generic Regex executor function */
  let resultArray = [];
  let intermediateResult;

  while((intermediateResult = regexStatement.exec(targetText)) !== null) {
    resultArray.push(intermediateResult);
  }

  return resultArray;
}

Array.prototype.unique = function() {
  return this.filter(function(value, index, self) {
    return self.indexOf(value) === index;
  });
}

function appendExportStatements(file, Exports, DefaultExport) {
  let exportsString = `\nexport { ${Exports} };`;
  if(exportsString === "\nexport {  };")
    exportsString = ""
  let defaultExportsString = `\nexport default ${DefaultExport};`;
  if(defaultExportsString === "\nexport default ;")
    defaultExportsString = ""
  file = `${file}
          ${exportsString}
          ${defaultExportsString}`;

  return file;
}

function replaceExports(file) {

  /* Problematic */
  file = file.replace(/export function/g, "function");
  file = file.replace(/export function*/g, "function*");
  file = file.replace(/export class/g, "class");

  /* Letters, const and var */
  file = file.replace(/export var/g, "var");
  file = file.replace(/export let/g, "let");
  file = file.replace(/export const/g, "const");

  /* Defaults */
  file = file.replace(/export default function/g, "function");
  file = file.replace(/export default function*/g, "function*");
  file = file.replace(/export default class/g, "class");
  // file = file.replace(/export default \b(\w*)\b;.*$/gm, ""); // experimental .*$ with m to remove the whole line
  file = file.replace(/export default (.*?);/g, "");
  /* Curlies */
  file = file.replace(/export \{([^}]+)\}.*$/gms, ""); // experimental .*$ with m to remove the whole line

  return file;
}

function handleDefaultExports(text) {
  /*
      Default exports are unique per module!
      TEST UNIQUENESS
  */
  let defaultExports = [];

  /* Case 7-9 */
  const regexExportDefaultExpression = /(?<export_default>export default) (?<identifier>(function|class|function\*|))? ?\b(?<id_name>\w*)\b/g;

  /* Store results of regexes */
  let resultStatement = execRegex(regexExportDefaultExpression, text);

  //console.log("STATEMENT", resultStatement);

  for(let stringMatch of resultStatement) {
    defaultExports.push(stringMatch[4]);
  }

  return defaultExports;
}

function handleIdentifierExports(text) {
  /* Handle class, function and function* cases
     where the block they open is not regex parsable
  */
  let identifierExports = [];

  const regexExportIdentifier = /(?<export>export) (?<identifier>function|class|function*) \b(?<id_name>\w*)\b/g

  /* Execute regex */
  let resultExportIdentifier = execRegex(regexExportIdentifier, text);

  //console.log("EXPORT IDENTIFIER", resultExportIdentifier);

  for(let stringMatch of resultExportIdentifier) {
    identifierExports.push(stringMatch[3]);
  }

  //console.log(identifierExports);

  return identifierExports;
}

function storeVariableNames(resultRegex) {

  let Exports = [];

  for(let stringMatch of resultRegex) {
    //console.log(stringMatch);
    let intermediateArray = stringMatch[stringMatch.length - 1].split(",");

    for(let variable of intermediateArray) {
      //console.log(variable);
      let cleanerRegex = /[ ]=[ ](\w*)/g;
      Exports.push(variable.trim().replace(cleanerRegex, ""));
    }
  }
  return Exports;
}

function handleVariableExports(text) {
  let variableExports = []

  /* Case 1-2 */
  const regexExportVariableCurly = /(?<export>export) \{(?<inCurlyExp>[^}]+)\}[;]*/gs;
  /* Case 3-4 */
  const regexExportConstVarLet = /\b(?<exportLetVarConst>export (let|var|const))\b (?<expression>.*?) /g;

  /* Make regexes, store results */
  let resultVariableCurly = execRegex(regexExportVariableCurly, text);
  let resultConstVarLet = execRegex(regexExportConstVarLet, text);

  /* Call storeVariableNames for both results and join result arrays into one */
  variableExports = storeVariableNames(resultConstVarLet).concat(storeVariableNames(resultVariableCurly));
  return variableExports;
}

function exportSystem(file) {

  /* Cases 1-4 */
  let variableExports = handleVariableExports(file.content).unique();
  /* Cases 5-6 */
  let identifierExports = handleIdentifierExports(file.content).unique();
  /* Cases 7,9 */
  let defaultExport = handleDefaultExports(file.content).unique();

  /* Remove lines and export statements to repurpose the file */
  let mutatedFileContent = replaceExports(file.content);

  if(defaultExport > 1) {
    throw "error";
  }
  /* Write exports at the end of file */
  let finishedFile = {
    ...file,
    content: appendExportStatements(mutatedFileContent, variableExports.concat(identifierExports), defaultExport)
  };

  //console.log(finishedFile);
  return finishedFile;

}
// exportSystem({content:require("./testExport").default})

export default exportSystem;

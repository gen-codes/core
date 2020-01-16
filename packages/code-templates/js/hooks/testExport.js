const test = `
export { name1,
  name2, xtapodi, kalamari,
  name3, nameOfNameTouName };
export {
  variable1 as name1, variable2 as name2, xtapodi as giorgos, kalamari as Xipolytas, nameName };
export let name1, name2, vaggelis, nameN; // also var, const
export let den = vaggelis, eixame = giannis, name5, nameOSLO; // also var, const
export function FunctionName() {
    while(true) {
      helloworld()
    }
} //case 5

RANDOM TEXT
export class ClassName {...} // case 6

registerComponents(targetTemplate);
    /* Initialize the templates with globalContext */
    const templatesWithContext = utils.generateFileContexts(templates,globalContext);

    /* Converts templates from GenLang to HB syntax (through transformations)
       and produces and runs HB compile with context per file
    */
    const files = compileTemplatesWithContext(templatesWithContext)

    /* TODO: Billy*/
    const filesWithImports = files.map(importSystem.handleSingleFileImports)

    return filesWithImports
TEXT RANDOM END

export default expression; //case 7
export default function magkas(…) { //case 9
    hola_guapo();
 } // also class, function*
export default function name1(…) { … } // also class, function* //case 9
export {}; //case null
`
export default test;

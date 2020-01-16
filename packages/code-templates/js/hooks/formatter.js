import prettier from "prettier"

const Linter = require("eslint").Linter;
const linter = new Linter();


export default function formatter(f) {
  if(f.filename.endsWith("js")){
    const prettier_content = prettier.format(f.content, {semi: false, parser: "babel"})
    const eslint_content =  linter.verifyAndFix(prettier_content).output
    const removed_empty_lines_content = eslint_content.replace(/,\n\n/g, ",\n")
    return {...f, content: removed_empty_lines_content};
  }
  return f
}
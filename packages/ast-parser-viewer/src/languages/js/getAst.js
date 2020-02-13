var esprima = require("esprima");
export function getAst(code) {
  const template = esprima.parseScript(code, {
    jsx: true,
    comment: true,
    loc: true
  });
  return template;
}

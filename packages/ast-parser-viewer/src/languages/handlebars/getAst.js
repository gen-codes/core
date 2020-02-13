import hb from "handlebars";

export function getAst(code) {
  return hb.parse(code);
}

import { getAst } from "./getAst";

const code = `
  
  {{for defaultProp in defaultProps}}
    {{defaultProp.key}}: {{toValue(defaultProp.value)}},
  {{/for}}
  {{for defaultProps in defaultPraops}}
    {{for alert in defaultProps}}
      {{if somt}}
        hell
      {{/if}}
    {{/for}}
    {{defaultProp.key}}: {{toValue(defaultProp.value)}},
  {{/for}}



`
  .replace(/{{for/g, "{{#for")
  .replace(/{{if/g, "{{#if")
  .replace(/{{(.*?)\((.*?)\)}}/g, "{{$1 $2}}");
const rules = {
  blocks: {
    check: "body",
    data: {
      fors: [
        {
          path: "body[*type=BlockStatement][*path][*original=for].original.parent",
          data: {
            params: "params[*].original"
          }
        }
      ],
      ifs: [
        {
          path: "body[*type=BlockStatement][*path][*original=if].original.parent",
          data: {
            params: "params[*].original"
          }
        }
      ],
      // params: "body[**type=BlockStatement].path.original"
    }
  }
};
// console.log(JSON.stringify(getAst(code)))
export default {
  ast: getAst(code),
  rules,
  code,
  getAst
};

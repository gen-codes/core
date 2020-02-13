import { getAst } from "./getAst";
const q = {
  expression:{
    left: {
      property:{
        name: "propTypes"
      },
      object: {
        name: "{name}"
      }
    },
    right: {
      properties: [
        {
          key: "{props[].name}",
          value: {
            object: {
              property: {
                name: "{props[].type}"
              }
            }
          }
        }
      ]
    }
  }
}
export const rules = {
  propTypes: {
    check: "expression.left.property[name=propTypes].name",
    data: {
      name: "expression.left.object.name",
      props: [
        {
          path: "expression.right.properties[]",
          data: {
            name: "key.name",
            docstring:
              "$.comments[loc][end][line={(key.loc.start.line)-1}].parent.parent.value",
            type:
              "value.object.property.name|value.property.name|value.arguments[elements].value",
            isRequired: "!(value.property.name) === 'isRequired'"
          }
        }
      ]
    }
  }
};
const code = `
Button.propTypes = {
  // Can have a Link child or icon
  children: PropTypes.node.isRequired,
  xsFullWidth: PropTypes.bool,
  color: PropTypes.string,
  // hello
  variant: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"])
  
};

`;
export default {
  ast: getAst(code),
  rules,
  getAst,
  code
};

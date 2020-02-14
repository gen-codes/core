# JSON-Transformer

Extract deeply nested data into your own schema

## How it works 

json-transformer traverses the data and scrapes data based on a json query
syntax.

It takes as an input a rules object and the nested data.
The rules object first checks if a query has a response. If it checks true than it matches the responses of the queries with the corresponding field.
The query-engine is based on the json-query npm package with some additions. 
`{query}` is replaced with the response of the corresponding query.
`(=1+2)` is replaced with the eval if the enclosed code `(=1+2)` === `3`

`!query` will return true if something is found else false 
`(query) + 'Prop'` will return the evaluation of the whole string first replacing the query in parentheses.

## Example

We want to extract propTypes data with their comments from this piece of js code:
```js
Button.propTypes = {
  // Can have a Link child or icon
  children: PropTypes.node.isRequired,
  xsFullWidth: PropTypes.bool,
  color: PropTypes.string,
  // hello
  variant: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"])
  
};
```
We parse the code to AST using esprima parser and then we run json-transformer 
with these rules:
```js
const rules = {
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
```

The result will be:

```json
[
  {
    "name": [
      "Button"
    ],
    "props": [
      {
        "name": "children",
        "docstring": " Can have a Link child or icon",
        "type": "node",
        "isRequired": true
      },
      {
        "name": "xsFullWidth",
        "docstring": null,
        "type": "bool",
        "isRequired": false
      },
      {
        "name": "color",
        "docstring": null,
        "type": "string",
        "isRequired": false
      },
      {
        "name": "variant",
        "docstring": " hello",
        "type": "string",
        "isRequired": false
      },
      {
        "name": "size",
        "docstring": null,
        "type": [
          "small",
          "medium",
          "large"
        ],
        "isRequired": false
      }
    ]
  }
]
```

More examples can be found at the [ast-parser-viewer package](https://github.com/gen-codes/core/tree/master/packages/ast-parser-viewer/src/languages)
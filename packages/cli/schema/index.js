const PropTypes = ["string", "bool", "oneOf", "oneOfType", "arrayOf", "node"]
const externalEditor = (type, props={})=>{
  if(type==="md"){
    return {
      type,
      component: "MarkdownEditor"
    }
  }else{
    return {
      type,
      component: "CodeEditor",
      props: {
        lang: type,
        ...props
      }
    }
  }
}
const PropTypeProperties = {
  type: PropTypes,
  "if(type==='oneOfType')": {
    oneOfType: "PropTypes"
  },
  "if(type === 'oneOf')": {
    oneOf: "Choices"
  },
  "if(type === 'arrayOf')": {
    arrayOf: "PropType"
  },
  // required: "boolean"
}
const schema = [
  {
    name: "Project",
    plural: "Projects",
    properties: {
      type: ["Project Generator", "Component Generator"],
      _switch: {
        type: {
          "Component Generator": {
            componentType: ["Element", "Section", "Layout", "Page"]
          }
        },
        componentType: {
          "Element": {
            element: "Element"
          }
        }
      },
    }
  },
  {
    name: "Element",
    plural: "Elements",
    properties: {
      subGenerators: {
          multiple: true,
          enum: ["component.js",  "component.tests.js", "component.doc.md"]
      },
      name: "string",
      "if(subGenerators.includes('component.js'))":{
        materialUIimports: {
          multiple: true,
          enum: ["Button", "TextInput", "Appbar", "Select", "CheckBox", "Card", "Snack"]
        },
        styles: "Styles",
        props: "Props",
      },
      "if(subGenerators.includes('component.tests.js'))":{
        defaultTests: "boolean",
        tests: "Tests",
      },
      "if(subGenerators.includes('component.doc.md'))":{
        defaultDocs: "boolean",
        docs: "Docs",
      }
    }
  },
  {
    name: "Template",
    plural: "Templates",
    properties: {
      name: ["element", "elementDoc", "elementTest"],
      file: {
        type: "createFile",
        default: {
          switch:{
            name: {
              element: "{$.name}.js",
              elementDoc: "{$.name}Doc.md",
              elementTest: "{$.name}.test.js"
            }
          }
        } 
      }
    }
  },
  {
    name: "Test",
    plural: "Tests",
    properties: {
      name: "string",
      render: "string",
      check: "Checks"
    }
  },
  {
    name: "Check",
    plural: "Checks",
    properties: {
      type: ["toHaveTextContext", "custom"],
      "if(type!=='custom')": {
        value: "string"
      },
      "if(type==='custom')": {
        customValue: externalEditor("javascript")
      }
    }
  },
  {
    name: "PropType",
    plural: "PropTypes",
    properties: PropTypeProperties
  },
  {
    name: "Prop",
    plural: "Props",
    properties: {
      name: "string",
      description: "string",
      defaultValue: "string",
      ...PropTypeProperties,
    }
  },
  {
    name: "Choice",
    plural: "Choices",
    properties: {
      value: "string"
    }
  },
  {
    name: "Style",
    plural: "Styles",
    properties: {
      name: "string",
      breakpoints: {
        enum: ["xs", "sm", "md", "lg", "xl"],
        multiple: true
      },
      css: externalEditor("css")
    }
  },
  {
    name: "Doc",
    plural: "Docs",
    properties: {
      type: ["What", "How", "When", "Custom"],
      "if(type === 'Custom')": {
        title: "string",
      },
      content: externalEditor("md")

    }
  }
]
export default schema

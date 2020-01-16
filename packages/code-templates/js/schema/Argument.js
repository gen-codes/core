export default {
  plural: "Arguments",
  ui: {
    ArrayComponent: "SimpleItemList",
    title: "Arguments",
    ItemComponent: "ExpendableInputs",
    primary: ["name", "type"],
    secondary: ["defaultValue"]
  },
  properties: {
    name: {
      type: "string",
      ui: {
        component: "PanelInputText"
      }
    },
    type: {
      type: "string",
      ui: {
        component: "PanelInputSelect",
        options: {
          query: {
            domain: "mern",
            custom: "getAllModelProperties"
          }
        }
      }
    },
    defaultValue: {
      type: "string",
      ui: {
        component: "PanelInputText"
      }
    }
  }
}
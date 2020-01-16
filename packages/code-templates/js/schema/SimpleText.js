export default {
  plural: "SimpleTexts",
  ui: {
    ArrayComponent: "SimpleItemList",
  },
  properties: {
    value: {
      type: "string!",
      ui: {
        component: "PanelInputText"
      }
    },
  }
}
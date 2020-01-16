export default {
  plural: "TemplateFunctions",

  properties: {
    code: {
      type: "string",
      ui: {
        component: "hidden",
      }
    },
    template:{
      type: "string",
      ui: {
        component: "PanelCode",
        options:{
          height: "300px",
          width: "350px"
        }
      }
    }
  }
}
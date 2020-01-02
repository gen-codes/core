const PropTypes =  ["string", "bool","oneOf", "oneOfType", "arrayOf", "node"]
const PropTypeProperties = {
	type: PropTypes,
	"if(type==='oneOfType')":{
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
			"type!": ["Project Generator", "Atomic Generator" ],
			"if(type ==='Atomic Generator')":{
				"atomicType!": ["Element", "Section", "Layout", "Page"]
			},
			"if(atomicType === 'Element')":{
				atom: "Element"
			},
		}
	},
	{
		name: "Element",
		plural: "Elements",
		properties: {
			"|name!": "string",
			"materialUIimports": {
				multiple: true,
				enum: ["Button", "TextInput", "Appbar", "Select", "CheckBox", "Card", "Snack"]
			},
			styles: "Styles",
			props: "Props",
			defaultTests: "boolean = true",
			tests: "Tests",
			defaultDocs: "boolean = true",
			docs: "Docs",
			templates: "Templates"
    },
    
	},
	{
		name: "Template",
		plural: "Templates",
		properties: {
			name: ["atom", "atomDoc", "atomTests" ],
			saveAs: "string"
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
			"type!": ["toHaveTextContext","custom"],
			"if(type!=='custom')":{
				value: "string"
			},
			"if(type==='custom')":{
				"customValue!": "string"
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
			"|name!": "string",
			description: "md",
			defaultValue: "string",
			...PropTypeProperties,
		}
	},
	{
		name: "Choice",
		plural: "Choices",
		properties: {
			"value!": "string"
		}
	},
	{
		name: "Style",
		plural: "Styles",
		properties: {
			"name!": "string",
			breakpoints: {
				enum: ["xs","sm", "md", "lg", "xl" ],
				multiple: true
      },
      css: "css"
		}
	},
	{
		name: "Doc",
		plural: "Docs",
		properties: {
      "title!": {
        suggestions: [
          "How to use this component",
          "What is this component",
          "When is it used",
        ]
      },
			content: "md"

		}
	}
]
export default schema

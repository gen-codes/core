import mongoose from \'mongoose\'

const {{model.name}}Schema = new mongoose.Schema({
    {{for property in model.properties}}
    {{if property.type notEquals "Virtual"}}
    {{if property.template}}
    "{{property.name}}": {{with model=model}}{{with property=property}}{{switch property.template}}{{case "Boolean"}}{
  type: Boolean,
{{with property=property}}{{if property.unique}}
  unique: true,{{/if}}
{{if property.index}}
  index: true,{{/if}}
{{if property.required}}
  required: [true, {{if property.requiredMessage exists}} "{{property.requiredMessage}}" {{/if}}] ,{{/if}}{{/with}}

}{{/case}}{{case "Buffer"}}{
  type: \'Buffer\',
  {{with property=property}}{{if property.unique}}
  unique: true,{{/if}}
{{if property.index}}
  index: true,{{/if}}
{{if property.required}}
  required: [true, {{if property.requiredMessage exists}} "{{property.requiredMessage}}" {{/if}}] ,{{/if}}{{/with}}

}{{/case}}{{case "Date"}}{
  type: "Date",
  {{if property.min}}
  min: {{property.min}},
  {{/if}}
  {{if property.max}}
  max: {{property.max}},
  {{/if}}
{{with property=property}}{{if property.unique}}
  unique: true,{{/if}}
{{if property.index}}
  index: true,{{/if}}
{{if property.required}}
  required: [true, {{if property.requiredMessage exists}} "{{property.requiredMessage}}" {{/if}}] ,{{/if}}{{/with}}

}{{/case}}{{case "Number"}}{
{{with property=property}}{{if property.unique}}
  unique: true,{{/if}}
{{if property.index}}
  index: true,{{/if}}
{{if property.required}}
  required: [true, {{if property.requiredMessage exists}} "{{property.requiredMessage}}" {{/if}}] ,{{/if}}{{/with}}
type: "Number",
{{if property.min}}
min: {{property.min}},
{{/if}}
{{if property.max}}
max: {{property.max}},
{{/if}}
}{{/case}}{{case "OneToOne"}}
{
  {{withObject property.oneToOneRelation as model}}
  type: mongoose.Schema.ObjectId,
  ref: \'{{model.name}}\'
  {{/withObject}}
}
{{/case}}{{case "ScalarCommon"}}{{if property.unique}}
  unique: true,{{/if}}
{{if property.index}}
  index: true,{{/if}}
{{if property.required}}
  required: [true, {{if property.requiredMessage exists}} "{{property.requiredMessage}}" {{/if}}] ,{{/if}}{{/case}}{{case "String"}}import {model} from "mongoose"

{
  type: String,
{{with property=property}}{{if property.unique}}
  unique: true,{{/if}}
{{if property.index}}
  index: true,{{/if}}
{{if property.required}}
  required: [true, {{if property.requiredMessage exists}} "{{property.requiredMessage}}" {{/if}}] ,{{/if}}{{/with}}
{{if property.lowercase}}
  lowercase: true,
{{/if}}
{{if property.uppercase}}
  uppercase: true,
{{/if}}
{{if property.trim}}
  trim: true,
{{/if}}
{{if property.match}}
  match: {{property.match}},
{{/if}}
{{if property.minlength}}
  minlength: {{property.minlength}},
{{/if}}
{{if property.maxlength}}
  maxlength: {{property.maxlength}},
{{/if}}{{if property.enum notEmpty}}
  enum: [{{for enumChoice in property.enum}}"{{enumChoice.value}}", {{/for}}]
{{/if}}

}
{{/case}}{{case "Validators"}}{{for property in model.properties}}
{{if property.validators notEmpty}}
{{../model.name}}Schema.path("{{property.name}}").validate(
    [
        {{for validator in property.validators}}
        {{if validator.func.template}}
        {
            validator: {{> (dynamicPartial validator.func.template) model=../../model property=../property validator=validator}},
            msg: \'{{validator.errorMessage}}\'
        },
        {{/if}}
        {{/for}}
    ]
)

{{/if}}
{{/for}}{{/case}}{{case "Virtual"}}.virtual(\'{{property.name}}\' {{if property.virtual.type notEquals "custom"}}, {
  ref: \'{{property.virtual.ref}}\',
  localField: \'{{property.virtual.localField}}\',
  foreignField: \'{{property.virtual.foreignField}}\',
  {{if property.virtual.count}}
  count: true,
  {{/if}}
  //getters:[]
}{{/if}})
{{if property.virtual.type equals "custom"}}
.get({{> (dynamicPartial property.virtual.get.template) property=property model=model}})
.set({{> (dynamicPartial property.virtual.set.template) property=property model=model}})
{{/if}}

(properties){property in properties:
  `
  .virtual(\'${property.name}\'`{virtual.type != \'custom\'
  `, {
    ref: \'${virtual.ref}\',
    localField: \'${virtual.localField}\',
    `{if virtual.count`count: true`
    }
    `}`
  }elseif virtual == \'blastom\':
  `, null`
  }`)`{virtual.type == "custom"
  `.get(${dynamicPartial(property.virtual.get.template)(property=property,model=model)})
   .set(${dynamicPartial(property.virtual.get.template)(property=property,model=model)})
  `
     }
  }{{/case}}{{/switch}}{{/with}}{{/with}},
    {{/if}}
    {{/if}}
    {{/for}}

  })









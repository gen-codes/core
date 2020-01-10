import TextInput from '../components/TextInput';
import SelectInput from '../components/SelectInput';
import CheckBox from '../components/Checkbox';
import MultiSelectInput from '../components/MultiSelectInput';
import ArrayField from "../fields/ArrayField";
import ObjectField from '../fields/ObjectField';
import Editor from '../components/Editor';
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const regexChecker = (regex) => function({data,errors=[]}){
  if(regex.test(data)){
    return {
      data,
      errors
    }
  }else{
    return {
      data,
      errors: errors.concat([`wrong format`])
    }
  }
}
export function handleProperty(name, prop, condition = "", schema) {
  const placeholder = name
  if(typeof(prop) === "string"){
    prop = {
      type: prop
    }
  }
  if(prop.type && prop.type.endsWith("!")){
    prop.type = prop.type.match(/(.*?)!/)[1]
    prop.required = true
  }
  
  let validate = function(data) { return data}
  const validators = []
  if(prop.required){
    const requiredValidator = ({data,errors}) => {
      if(prop.required && !Boolean(data)){
        errors.push("This field is mandatory")
      }
      return {
        data,errors
      }
    }
    validators.push(requiredValidator)
  }
  if(prop.validators) {
    prop.validators.forEach((validator) => {
      if(validator instanceof RegExp) {
        validators.push(regexChecker(validator))
      }
      if(typeof(validator) === "function"){
        validators.push(validator)
      }
    })
    
  }
  validate = pipe(...validators)
  const onSubmit = prop.onSubmit
  const field = {
    name,
    label: prop.label || name,
    onSubmit: prop.onSubmit,
    validate,
    condition,
    required: prop.required || false,
    default: prop.default
  }
  if(Array.isArray(prop)) {
    // choice
    return {
      ...field,
      placeholder: `Select ${name}`,
      Input: SelectInput,
      inputConfig: {
        limit: 5,
        items: prop.map(choice => ({label: choice, value: choice}))
      }
    };
  }
  else if(typeof prop === "object") {
    if(prop.enum) {
      if(prop.multiple){
        return {
          ...field,
          placeholder: `Select ${name}`,
          Input: MultiSelectInput,
          inputConfig: {
            limit: 5,
            items: prop.enum.map(choice => ({label: choice, value: choice}))
          }
        };
        // multipleChoice
      }else{
        return {
          ...field,
          placeholder: `Select ${name}`,
          Input: SelectInput,
          inputConfig: {
            limit: 5,
            items: prop.map(choice => ({label: choice, value: choice}))
          }
        };
      }
    }
    if(prop.component) {
      return {
        ...field,
        placeholder: `Set ${name}`,
        Input: Editor,
        inputConfig: prop
      };
    }
    if(prop.type){
      
      if(prop.type.match(/^[A-Z]/)) {
        // object -> Array or Object
        const isPlural = schema.some(obj => obj.plural === prop.type);
        if(isPlural) {
          prop.type = schema.find(obj => obj.plural === prop.type).name;
          return {
            ...field,
            placeholder: `Add ${name}`,
            Input: ArrayField,
            inputConfig: {
              objectType: prop.type,
              schema
            }
          };
        }
        return {
          ...field,
          placeholder: `Set ${name}`,
          Input: ObjectField,
          inputConfig: {
            objectType: prop.type,
            schema
          }
        };
      }
      else {
        if(prop.type === "boolean") {
          return {
            ...field,
            placeholder: `Set ${name}`,
            Input: CheckBox,
            inputConfig: {
              trueString: "Yes",
              falseString: "No"
            }
          };
        }
        // scalar
        return {
          ...field,
          placeholder: `Type ${name}`,
          Input: TextInput,
          inputConfig: {
            type: prop.type
          }
        };
      }
    }
  }
  
}

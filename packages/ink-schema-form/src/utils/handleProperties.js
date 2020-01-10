import {handleProperty} from './handleProperty';
import IdInput from '../components/IdInput';
export function handleProperties(properties, condition, schema, prefix, root = true) {
  let fields = [];
  for(const propName in properties) {
    const prop = properties[propName];
    if(propName.startsWith("switch(")) {
      const switchField = propName.match(/\((.*?)\)/)[1]
      for(const value in prop) {
        const condition = `${switchField} === ${value}`
        fields = fields.concat(handleProperties(prop[value], condition, schema, `${prefix}`, false))
      }

    }
    if(propName.startsWith("if(")) {
      const condition = propName.match(/if\((.*?)\)$/)[1];
      fields = fields.concat(handleProperties(prop, condition, schema, `${prefix}`, false));
    }else {
      fields.push({prefix: `${prefix}.${propName}`, ...handleProperty(propName, prop, condition, schema)});
    }
  }
  if(root) {
    fields.push({
      Input: IdInput,
      name: "id",
      label: "id"

    })
  }
  return fields;
}

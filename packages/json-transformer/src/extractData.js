import { evaluateExpression } from "./evaluateExpression";
import {parse} from "handlebars";
export function extractData(fields, value,  root, helpers) {
  const data = []
  if (!fields) {
    return data;
  }
  const fieldsKeys = Object.keys(fields).sort(f =>
    f.startsWith("_") ? -1 : +1
  );
  for (const fieldName of fieldsKeys) {
    let field = fields[fieldName];
    if (Array.isArray(field)) {
      // why is that?
      // if (Array.isArray(value)) {
      //   value = value[0];
      // } 
      const items = evaluateExpression(field[0].path, value, helpers);
      if (items && items.length) {
         const parsedItems = items.map(item => {
          const subitems = extractData(field[0].data, item,  root, helpers);
          return subitems
        }).filter(i=>Boolean(i));
        if(parsedItems.length){
          data[fieldName] = parsedItems 

        }
      }
    } else if (typeof field === "object") {
      data[fieldName] = extractData(field, value,  root, helpers);
    } else {
      if (field.startsWith("_data")) {
        data[fieldName] = evaluateExpression(field, { _data: data }, root, helpers);
      } else {
        data[fieldName] = evaluateExpression(field, value, root, helpers);
      }
    }

  }
  if(!Object.values(data).some(d=>Boolean(d))){
    return null
  }
  return data;
}

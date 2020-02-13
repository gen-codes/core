import jsonQuery from "json-query";
import {extractData} from "./extractData";
import {evaluateExpression} from "./evaluateExpression";
export function traverse(jsonObj, rules, data = null, path = [], root) {
  if(!root) {
    root = jsonObj;
  } 
  if(jsonObj !== null && typeof jsonObj === "object") {
    Object.entries(jsonObj).forEach(([key, value]) => {
      // key is either an array index or object key
      if(key !== "parent" && key !== "root") {
        const currentPath = [...path, key].join(".");
        for(const ruleName in rules) {
          const rule = rules[ruleName];
          const result = evaluateExpression(rule.check, value);
          if(result) {
            if(Array.isArray(result) && !result.length) {

            } else {
              const extractedData = extractData(
                rule.data,
                value,
                root
              );
              if(extractedData){
                if(!data) {
                  data = {}
                }
                if(!data[currentPath]){
                  data[currentPath] = {}
                }
                if(data[currentPath][ruleName]){
                  if(Array.isArray(data[currentPath][ruleName])){
                    data[currentPath][ruleName].push(extractedData)  
                  }else{
                    data[currentPath][ruleName] = [data[currentPath][ruleName], extractedData]
                  }
                }else{
                  data[currentPath][ruleName] = extractedData
                }
              }
            }
          }
        }
        if(value && typeof value === "object") {
          const innerData = traverse(value,  rules, null, [...path, key], root);
          data = {
            ...data,
            ...innerData
          }
        }
      }
    });
  }
  return data;
}

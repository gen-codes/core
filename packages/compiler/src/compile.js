import jsonQuery from "json-query";
import {deepValue} from "./utils/deepValue";
import {compileTemplateFile} from "./compileTemplateFile";


export function compile(node, variables, context, prefix = "./", generator) {
  // console.log(context._source_map)
  if(!node || typeof (node) !== "object") {
    return node;
  }
  if(node._variables) {
    variables = {...variables, ...node._variables};
    delete node._variables;
  }

  if(node._template) {
    node = compileTemplateFile(node, variables, context, generator);
  }
  const newNodes = {};
  for(const key in node) {
    if(typeof (node[key]) === "object") {
      if(key.match(/\{\{(.*?)\}\}/)) {
        if(key.match(/\{\{(.*?) in (.*?)\}\}/)) {
          const [, item, items] = /\{\{(.*?) in (.*?)\}\}/.exec(key);
          const itemsData = jsonQuery(items, {
            data: context
          }).value;
          const [obj, property] = item.split(".");
          if(itemsData) {
            const iteratedFiles = itemsData.reduce((files, item) => {
              const newName = key.replace(/\{\{(.*?) in (.*?)\}\}/, item[property]);
              let newContext = {
                ...context,
                [obj]: item,
              };
              // const nodeContext = node[key]._context
              // if(nodeContext) {
              //   console.log("TCL: compile -> nodeContext", nodeContext)
              //   // console.log(nodeContext)
              //   // for(let cKey in nodeContext){
              //   //   const [,variable] = nodeContext[cKey].match(/var\((.*?)\)/)
              //   //   console.log(cKey)
              //   //   if(variable){
              //   //     nodeContext[cKey] = variables[variables]
              //   //   }
              //   // }
              //   newContext = {
              //     ...newContext,
              //     ...nodeContext
              //   }
              // }
              // const regenerate = (innerNode)=>{
              //   return compile(innerNode, variables, newContext, "", generator )
              // }
              // node[key] = compile(node[key], variables, newContext, "", generator )
              // let newNode = {
              //   ...node[key],
              // }
              const newNode = compileTemplateFile(node[key], variables, newContext, generator, newName);
              return {
                ...files,
                [newName]: newNode
              };
            }, {});
            for(let fileName in iteratedFiles) {
              newNodes[fileName] = iteratedFiles[fileName];
            }
          }
          // console.log(itemsData)
          // newNodes[]
        }
        else {
          const path = key.replace(/\{\{(.*?)\}\}/, deepValue(context, key.replace(/[{}]/g, "")));
          newNodes[path] = compile(node[key], variables, context, "", generator);
        }
      }
      else if(key.match(/var\((.*?)\)/)) {
        const varName = /var\((.*?)\)/.exec(key)[1];
        const newKey = key.replace(/var\((.*?)\)/, varName);
        // console.log(varName, key, variables[newKey])
        newNodes[variables[newKey]] = compile(node[key], variables, context, "", generator);
      }
      else {
        newNodes[key] = compile(node[key], variables, context, "", generator);
      }
    }
    else {
      newNodes[key] = compile(node[key], variables, context, "", generator);
    }
  }
  return newNodes;
}

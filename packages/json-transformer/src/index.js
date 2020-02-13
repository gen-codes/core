import {traverse} from "./traverse"
import {unflat} from "./utils"
export default function parse(ast, rules, options){
  const data = traverse({$:ast},rules)
  if(options && options.location){
    return data
  }
  const parsedData = Object.values(data).reduce((newData, d)=>{
    for(const item in d){
      const value = d[item]._value?d[item]._value:[d[item]]
      if(newData[item]){
        newData[item].concat(value)
      }else{
        newData[item] = value
      }
    }
    return newData
  },{})

  return parsedData
}
import jsonQuery from "json-query";
import {deepValue} from "../utils/deepValue";
function getValue(str, path, opts, ref=false) {
  let regexMode = false
  let data = opts.data
  if(!str || typeof(str)==="object"){
    return ""
  }

  const queryRegex = /\{?([0-9]+)\.([A-z]+)\}?/
  let res;
  let foundPath = false
  const flat = data._flat?data._flat:data.root._flat
  while((res=queryRegex.exec(str))!==null){
    foundPath = true
    const result = flat[res[1]]?flat[res[1]][res[2]]:"notfound"
    str = str.replace(res[0], result)
  }
  if(foundPath){
    str = getValue(str,path, {data})
  }
  const metadata = data.root._metadata
  if(metadata && metadata.getValue && path){
    const [item, field] = path.split(".")
    // console.log(item,opts.blockParams[1][0])
    let itemId
    // console.log(opts.blockParams[0][0])
    if(opts.blockParams && opts.blockParams[0] ){
      itemId = opts.blockParams[0][0]._id
    }else if(opts.blockParams && opts.blockParams[2] ){
      itemId = opts.blockParams[2][0]._id
    }
    if(!itemId){
      return str
      // itemId = opts.blockParams[3][0]._id
    }
    let {before, after, value} = metadata.getValue
    before = before?before(itemId, field, item):""
    after = after?after(itemId, field, item):""
    str = value?value(itemId, field, str):str
    str = `${before}${str}${after}`
  }

  return str
}
export default  {
 getValue
}


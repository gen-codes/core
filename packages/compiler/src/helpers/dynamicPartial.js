import {deepValue} from "../utils/deepValue"
export default {
  dynamicPartial: function(type, subType , opts) {
    if(!type){
      console.log("Empty partial")
      return "missing"
    }
    // console.log(type)
    const sourceMapRegex = /_source_map/g
    if(sourceMapRegex.exec(type)) {
      // console.log("TCL: if(sourceMapRegex.exec(type)) {",)
      // console.log(opts)
      const path = type.replace(sourceMapRegex, "")
      const value = deepValue(opts.data.root._context, path)
      if(value){
        return value
      }else{
        // console.log("Missing partial:", type,
        // deepValue(opts.data.root._context, path), Object.keys(opts.data.root._context), path)
        throw "Missing partial"
        return "missing"
      }
    }
    return `${type}${subType}`
  }
}

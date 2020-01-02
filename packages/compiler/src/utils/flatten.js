export default function flatten(obj, flatObj = {}) {
  for(let field in obj) {
    if(Array.isArray(obj[field])) {
      obj[field].forEach(item => {
        if(item && item._id) {
          flatObj[item._id] = item
          flatObj = {...flatObj, ...flatten(item, flatObj)}
        }
      })
    } else if(typeof (obj[field]) === "object") {
      console.log(obj[field], field)
      flatObj = {...flatObj, ...flatten(obj[field], flatObj)}
    }
  }
  return flatObj
}
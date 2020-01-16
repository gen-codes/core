export function deepValue(obj, path) {
  // console.log(obj)
  if(typeof (obj) !== "object" || !obj) {
    throw "Not an object for path: " + path
  }
  let newObj = obj
  // console.log(Object.keys(obj))
  try {
    path = path.split(/[\.\[\]\($$)]/g).filter(p=>p!=="")
    // console.log(path)
    for(let i = 0, len = path.length; i < len; i++) {
      newObj = newObj[path[i]];
      // console.log(path[i])
      // if(typeof(newObj) === "object")
      // console.log(Object.keys(newObj))
    }
  } catch(err) {
    throw err
  }
  // console.log(newObj)
  return newObj;
}

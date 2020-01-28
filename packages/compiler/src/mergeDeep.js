export function mergeDeep(...objects) {
  const isObject = obj => obj && typeof obj === 'object';
  return objects.reduce((prev, obj) => {
    // console.log(prev,obj)
    if(obj && Object.keys(obj).length)
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];
        if(Array.isArray(pVal) && Array.isArray(oVal)) {
          prev[key] = pVal.concat(oVal);
          // pVal.map((v,i)=>mergeDeep(v,oVal[i]||{}));
          // if(oVal.length>pVal.length){
          //   prev[key] = prev[key].concat(oVal.slice(pVal.length))
          // }
        }
        else if(isObject(pVal) && isObject(oVal)) {
          prev[key] = mergeDeep(pVal, oVal);
        }
        else {
          prev[key] = oVal;
        }
      });
    return prev;
  }, {});
}

import util from "./getValue";
export default {
  custom_if(v1, v2, v3, opts){
    let regexMode = false
    if(opts && opts.data.root._regex){
      regexMode = true
    }
    // console.log(v1, v2,)
    const checks = {
      equals: (a,b)=>{
        return a === b
      },
      notEquals: (a,b)=>{
        return a !== b
      },
      greaterThan: (a,b)=>{
        return a>b
      },
      lowerThan: (a,b)=>{
        return a<b
      },
      startsWith: (a,b)=>{
        return a.startsWith(b)
      },
      endsWith: (a,b)=>{
        return a.endsWith(b)
      },
      notEmpty: (a)=>{
        return a && a.length !== 0
      },
      and: (a,b)=>{
        return a && b
      },
      or: (a,b)=>{
        return a || b
      },
      exists: (a)=>{
        return Boolean(a)
      },
      'in': (a,b)=>{
        return b.indexOf(a)>-1
      },
    }
    if(!opts){
      opts = v3
    }
    const getValue = util.getValue
    // console.log(v1,v3)
    if(v2==="exists"){
      return checks[v2](getValue(v1,null, opts, true)) ? opts.fn(this) : opts.inverse(this);
    }
    return checks[v2](getValue(v1,null, opts, true), getValue(v3,null, opts, true)) ? opts.fn(this) : opts.inverse(this);
  }
}

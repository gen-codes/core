import logger from "./logger";

export default function (obj, keys, val) {
  keys = keys.replace("[", ".").replace("]", "")

  if(!keys){
    return val
  }
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x;
	for (; i < l; ++i) {
		x = t[keys[i]];
		t = t[keys[i]] = (i === l - 1 ? val : (x != null ? x : (!!~keys[i+1].indexOf('.') || !(+keys[i+1] > -1)) ? {} : []));
  }
  return obj
}
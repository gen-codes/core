import logger from "./logger";

export default function (obj, key, def, p, undef) {
  key = key.replace("[", ".").replace("]", "")
  if(!key){
    return obj
  }
	key = key.split ? key.split('.') : key;
	for (p = 0; p < key.length; p++) {
		obj = obj ? obj[key[p]] : undef;
	}
	return obj === undef ? def : obj;
}
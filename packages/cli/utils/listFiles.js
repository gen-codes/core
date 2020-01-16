import fs from "fs";
import path from "path";
export function listFiles(dir, filelist = [], exclude="", limitDepth, currentDepth=0) {
  /*  INPUT: target path
      OUTPUT: filelist
  */
  fs.readdirSync(dir).forEach(file => {
    if(exclude&&file.match(exclude)){
    }else if(limitDepth===currentDepth){
    }else{
      filelist = fs.statSync(path.join(dir, file)).isDirectory() ?
        listFiles(path.join(dir, file), filelist, exclude, limitDepth, currentDepth+1) :
        filelist.concat(path.join(dir, file));
    }
  });
  return filelist;
}

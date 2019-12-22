import fs from "fs";
import path from "path";
export function listFiles(dir, filelist = []) {
  /*  INPUT: target path
      OUTPUT: filelist
  */
  fs.readdirSync(dir).forEach(file => {
    filelist = fs.statSync(path.join(dir, file)).isDirectory() ?
      listFiles(path.join(dir, file), filelist) :
      filelist.concat(path.join(dir, file));
  });
  return filelist;
}

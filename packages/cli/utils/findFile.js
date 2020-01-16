import {listFiles} from "./listFiles";
export  function findFile(root, name, depth, exclude){
  return listFiles(root, [],exclude, depth)
  .find(f=>f.match(name))
}
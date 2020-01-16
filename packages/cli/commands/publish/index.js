import fs from "fs-extra"
import  React , {useState} from "react"
import path from "path"
import useConfig from "../../utils/useConfig"
import request from "request"
import {listFiles} from "../../utils/listFiles"
export default  () => {
  const genData = {file: ""};
  
  const [response, setResponse] = useState("")
  const cwd = process.cwd()
  if(fs.existsSync(path.join(cwd, ".gen/gen.module.json"))) {
    genData.file = path.join(cwd, ".gen/gen.module.json")
  } else if(fs.existsSync(path.join(cwd, "gen.module.json"))) {
    genData.file = path.join(cwd, "gen.module.json")
  } else {
    return "ERROR: Did not find gen.module.json in " + process.cwd()
  }
  const moduleFolder = path.dirname(genData.file)
  const genModule = fs.readJSONSync(genData.file)
  if(!genModule.name) {
    return "ERROR: gen.module.json file needs a name field"
  }
  if(!genModule.version) {
    return "ERROR: gen.module.json file needs a version field"
  }
  const configFile = useConfig()
  const config = fs.readJSONSync(configFile)
  if(!config.token) {
    return "ERROR: Please login"
  }
  const files = listFiles(moduleFolder, [], /node_modules|package-lock.json/)
  // return JSON.stringify(files)
  const filesObj = files.reduce((obj,file)=>({
    ...obj, 
    [file.replace(moduleFolder, "")]:fs.readFileSync(file).toString() 
  }),{})
  filesObj["gen.module.json"] = genModule
  // return JSON.stringify(filesObj)
  request.post({
    headers: {'Authorization': `Bearer ${config.token}`},
    url: 'https://sekbgx0674.execute-api.us-east-1.amazonaws.com/dev/publish',
    json: filesObj
  }, function(error, response, body) {
    console.log(body);
    // if(error){
    //   setResponse(error)
    // }else{
    //   setResponse(body)
    // }
  });
  return JSON.stringify(response)
}
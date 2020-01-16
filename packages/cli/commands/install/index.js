import React, {useState, useEffect} from "react"
import fs from "fs-extra"
import path from "path"
import usePackage from "../../utils/usePackage"
import npmi from "../../utils/npmi"

const install = async (name, version, modulesPath)=>{
  const result = await new Promise((resolve,reject) => npmi({
    name,
    version,
    path: modulesPath,
    forceInstall: false,
    npmLoad: {
      loglevel: 'silent'	
    }
  }, function (err, result) {
    if (err) {
      if 		(err.code === npmi.LOAD_ERR) 	reject('npm load error');
      else if (err.code === npmi.INSTALL_ERR) reject('npm install error');
      reject(err.message);
    }else{
      resolve(result)
      // console.log(moduleName+'@'+version+' installed successfully in '+modulesPath);
    }
    // installed
  }))
  return result
}


export default function Install ({inputArgs}){
  const [outcome, setOutcome] = useState("")
    const { genFile } = usePackage()
  const genModule = fs.readJSONSync(genFile)
  if(!genModule.modules){
    genModule.modules = {}
  }
  const modulesPath = path.dirname(genFile)
  useEffect(() => {
    const runInstall = async ()=>{
      const pack = {}
      // let name ="";
      // let version ="";
      const inlineInstall = inputArgs.slice(1)
      if(inlineInstall.length){
        for(const inlineModule of inlineInstall){
          const moduleParts = inlineModule.split("@")
          if(moduleParts.length === 3){
            pack.name = moduleParts[1]
            pack.version = moduleParts[2] 
          }
          else if(inlineModule.startsWith("@")){
            pack.name = moduleParts[1]
            pack.version = "latest"
          }else if(moduleParts.length === 2){
            pack.name = moduleParts[0]
            pack.version = moduleParts[1] 
          }else{
            pack.name = moduleParts[0]
            pack.version = "latest" 
          }
          const normalModuleName = `@code-templates/${pack.name.replace("/","_")}`
          const result = await install(normalModuleName, pack.version, modulesPath)
          pack.version = result[0][0].split("@").pop()
          genModule.modules[inlineModule] = pack.version
          fs.writeJSONSync(genFile, genModule, {spaces: 2})

        }
      }else{
        if(genModule.modules){
          for(const moduleName in genModule.modules){
            const version = genModule.modules[moduleName]
            const normalModuleName = `@code-templates/${moduleName.replace("@", "").replace("/","_")}`
            install(normalModuleName, version, modulesPath)
            
          }
        }
      }
    }
    runInstall()
  }, [])
  // console.log(outcome)
  return outcome
}
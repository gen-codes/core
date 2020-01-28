import React, {useState, useEffect} from "react"
import fs from "fs-extra"
import path from "path"
import usePackage from "../../utils/usePackage"
import install from "../../utils/npmi"




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
          const normalModuleName = `@gen-codes-registry/${pack.name.replace("/","_")}`
          const {result} = await install(normalModuleName, pack.version, modulesPath)
          pack.version = result[0][0].split("@").pop()
          genModule.modules[inlineModule] = pack.version
          fs.writeJSONSync(genFile, genModule, {spaces: 2})

        }
      }else{
        if(genModule.modules){
          for(const moduleName in genModule.modules){
            const version = genModule.modules[moduleName]
            const normalModuleName = `@gen-codes-registry/${moduleName.replace("@", "").replace("/","_")}`
            install(normalModuleName, version, modulesPath)
            
          }
        }
      }
      setOutcome(true)
    }

    runInstall()
  
  
  }, [])
  // console.log(outcome)
  return outcome?"success":"installing"
}
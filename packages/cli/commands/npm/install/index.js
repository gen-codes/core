import React, {useState, useEffect} from "react"
import fs from "fs-extra"
import path from "path"
import usePackage from "../../../utils/usePackage"
import install from "../../../utils/npmi"


export default function NpmInstall({inputArgs}){
  const { genFile } = usePackage()
  const genModule = fs.readJSONSync(genFile)
  if(!genModule.dependencies){
    genModule.dependencies = {}
  }
  const modulesPath = path.dirname(genFile)
  useEffect(() => {
    const runInstall = async ()=>{
      const pack = {}
      const inlineInstall = inputArgs.slice(2)
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
          const {result} = await install(pack.name, pack.version, modulesPath)
          pack.version = result[0][0].split("@").pop()
          genModule.dependencies[inlineModule] = pack.version
          fs.writeJSONSync(genFile, genModule, {spaces: 2})

        }
      }else{
        if(genModule.dependencies){
          for(const moduleName in genModule.dependencies){
            const version = genModule.dependencies[moduleName]
            install(moduleName, version, modulesPath)
            
          }
        }
      }
    }
    runInstall()
  }, [])
  return "install"
}
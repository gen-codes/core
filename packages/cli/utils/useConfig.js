import AppDirectory from "appdirectory"
import path from "path";
import fs from "fs-extra"
const dirs = new AppDirectory({appName: "gen-codes"})
export default function useConfig(){
  const configPath = `${dirs.userConfig()}/gen.config.json`
  if(!fs.existsSync(configPath)){
    fs.outputFileSync(configPath, "{}")
  }
  return configPath
}
const helpers = {
  ...require("./changeCase").default,
  ...require("./each").default,
  ...require("./customIf").default,
  ...require("./switchCase").default,
  ...require("./cssGrid").default,
  ...require("./getValue").default,
  ...require("./stringify").default,
  ...require("./dynamicPartial").default,
  ...require("./mergeWithComma").default,
  
}
export default helpers

// import {readdirSync} from "fs"
// const helperFiles = readdirSync(__dirname)
// .filter(file=>!file.endsWith("index.js"))
// let helpers = {}
// for(let helperName of helperFiles){
//   if(helperName === "custom"){
//     readdirSync(__dirname+"/custom").forEach(customHelper=>{
//       helpers = {
//         ...helpers,
//         ...require(`./custom/${customHelper}`).default
//       }

//     })
//   }else{
//     helpers = {
//       ...helpers,
//       ...require(`./${helperName}`).default
//     }

//   }
//   console.log(helperName)
// }
// export default helpers;
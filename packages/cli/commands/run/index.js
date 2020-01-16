// find .gen/package.json file up till root /
// if not found use global cache
import React, {useState} from "react"
import usePackage from "../../utils/usePackage"
import fs from "fs-extra"
import SchemaForm from "@gen-codes/ink-schema-form"
// if no arg then show list of installed generators
// give option for installation

// if generator_name arg then check if 
// generator is installed else install it
import schema from "../../schema"


export default ({inputArgs, file}) => {
  const {genFile, modules} = usePackage()
  const genModule = fs.readJSONSync(genFile)
  const [formData, setData] = useState({})
  const [run, setRun] = useState(false)
  // return JSON.stringify(genModule)
  if(!run) {
    if(!inputArgs[1]) {
      // choose generator or install
      return <SchemaForm
        onSubmit={(data) => {
          setRun(true)
        }}
        onChange={(data) => {setData(data)}}
        value={formData}
        // objectType={"GeneratorPackage"}
        objectType={"InstalledGenerator"}
        schema={schema}
        config={{
          genModule
        }}
      />

    } else {

    }

  } else {
    return JSON.stringify(formData)

  }

  return modules
}

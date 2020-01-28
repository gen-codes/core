// find .gen/package.json file up till root /
// if not found use global cache
import React, {useState} from "react"
import PropTypes from "prop-types"
import usePackage from "../../utils/usePackage"
import fs from "fs-extra"
import SchemaForm from "@gen-codes/ink-schema-form"
// if no arg then show list of installed generators
// give option for installation

// if generator_name arg then check if 
// generator is installed else install it
import schema from "../../schema"
import {parseGenerator, runGenerator} from "@gen-codes/compiler"
import path from "path";
import {getDir} from "@gen-codes/carlo-editor-cli-plugin"


function Run({inputArgs, filetree, template, model}) {
  const {genFile, modules} = usePackage()
  const moduleFolder = path.dirname(genFile)
  const generator = parseGenerator(moduleFolder)
  // return JSON.stringify(generator.fileTrees)
  const genModule = fs.readJSONSync(genFile)
  const [formData, setData] = useState({})
  const [run, setRun] = useState(false)
  // return JSON.stringify(genModule)
  if(!run) {
    if(inputArgs[1]) {
        return <SchemaForm
          onSubmit={(data) => {
            setRun(true)
            const files = runGenerator(generator, formData, generator.fileTrees[inputArgs[1]])
          }}
          externalEditor={getDir()}
          onChange={(data) => {setData(data)}}
          value={formData}
          objectType={inputArgs[1]}
          schema={generator.schema}
          config={{
            genModule
          }}
        />
        // return "run:" + inputArgs[1]

    }
    if(!filetree && !template && !model) {
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
      // compiler({

      // })
      return "f:" + filetree || "model:" + model
    }

  } else {
    return JSON.stringify(formData)

  }

  return modules
}
Run.propTypes = {
  template: PropTypes.string,
  filetree: PropTypes.string,
  model: PropTypes.string,
};
Run.aliases = {
  template: 't',
  model: "m",
  filetree: "f"
};
export default Run
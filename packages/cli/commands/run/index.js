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
import compiler from "@gen-codes/compiler"



function Run({filetree,template,model}) {
  const {genFile, modules} = usePackage()
  const genModule = fs.readJSONSync(genFile)
  const [formData, setData] = useState({})
  const [run, setRun] = useState(false)
  // return JSON.stringify(genModule)
  if(!run) {
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
      return filetree || "model:"+model
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
// find .gen/package.json file up till root /
// if not found use global cache

import usePackage from "../../utils/usePackage"
import fs from "fs-extra"
// if no arg then show list of installed generators
// give option for installation

// if generator_name arg then check if 
// generator is installed else install it

function Create({inputArgs, file}) {
  const {genFile, modules} = usePackage()
  const genConfig = fs.readJSONSync(genFile)
  const chooseGeneratorSchema = {
    name: "LoadGenerator",
    plural: "LoadGenerators",
    properties: {
      name: genConfig.dependencies.map(dependency=>dependency.name) 
    }
  }
  if(!inputArgs[1]){
    // choose generator or install
  }else{

  }
  
  return modules
}
// Create.propTypes = {
// 	inputArgs: PropTypes.array
// };

export default Create
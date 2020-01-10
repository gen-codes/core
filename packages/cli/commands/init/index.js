import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Box} from '@gen-codes/ink-cli';
import {findFile} from '../../utils/findFile';
import path from "path"
import fs from "fs-extra";
import SchemaForm from '@gen-codes/ink-schema-form';
import schema from "../../schema"

const newProjectFiles = {
  ".gen/schema/index.js": `export default const schema = {}`,
  ".gen/templates/partials/": true
}
function Init({inputArgs}) {
  const location = inputArgs[1] && path.join(process.cwd(), inputArgs[1]) || process.cwd()
  const [config, setConfig] = useState({})
  const [state, setState] = useState("checking_files")
  const [data ,setData] = useState()
  useEffect(() => {
    const configLocation = findFile(location, "gen.package.json", 2, /node_modules/)
    if(configLocation) {
      // const config = fs.readJSONSync(configLocation)

      setConfig(fs.readJSONSync(configLocation))
      setState("already_initialized")
    } else {
      setState("initialize_form")
    }
  }, [])
  const initializeForm = (
    <SchemaForm
      onSubmit={(newData) => {setData(newData)}}
      value={data}
      objectType={"Project"}
      schema={schema}
    ></SchemaForm>
  )
  const alreadyInitialized = (
    <Box flexDirection={"column"}>
      <Box>
        The directory is already already initialized
      </Box>
      <Box>
        {JSON.stringify(config)}
      </Box>
    </Box>
  )
  return (
    <Box>
      {state === "checking_files" && <Box>initializing..</Box>}
      {state === "already_initialized" && alreadyInitialized}
      {state === "initialize_form" && initializeForm}
      {/* {location} */}
    </Box>
  );

}
Init.propTypes = {
  folder: PropTypes.string,
};

// Init.positionalArgs = ['folder'];

export default Init;
import React, {useState, useEffect} from 'react'
import SchemaForm from "@gen-codes/ink-schema-form"
import {Tabs, Tab, useApp, Box, Text} from '@gen-codes/ink-cli'
import schema from "../schema"
import highlight from 'cli-highlight'
import {getDir} from "@gen-codes/carlo-editor-cli-plugin"
import useCarlo from "@gen-codes/use-carlo-react-hook"
export const FormContext = React.createContext()

// fs.lstatSync(__dirname+"../plugins/editor/dist")
// const editorPath = path.dirname(require.resolve("@gen-codes/carlo-editor-cli-plugin/package.json"));

export default function CliForm(props) {
  // track which is the real activeField and Form instance
  // add horizontal nested Tab functionality with tabname = schema.property.identifier === true
  // const [stdout, setStdout] = useState("");
  const [formData, setData] = useState();
  // console.log(term)
  const updateExternal = useCarlo("")
  const [print, setPrint] = useState(false);
  // const [tab, setTab] = useState("foo");
  const [currentForm, setCurrentForm] = useState("")
  return (
    <FormContext.Provider value={{currentForm, setCurrentForm}}>
      {formData &&<Box>{JSON.stringify(formData, undefined, 2)}</Box>}

      <Box flexDirection="column"  >
          <Box  marginBottom={1} float={"left"} flexDirection={"column"}>
            <SchemaForm
              externalEditor={getDir()}
              onSubmit={(data) => {setData(data)}}
              value={formData}
              objectType={"Element"}
              schema={schema}
            ></SchemaForm>
          </Box>
          {/* <Box width={"50%"} height={"100%"} justifyContent={"flex-end"} textWrap="wrap" float={"right"} flexDirection="column">

            {tab === "foo" && <Text textWrap="wrap" >
              {hl(code, "js")}

            </Text>}
            <Tabs onChange={setTab}>
              <Tab name="foo">Foo</Tab>
              <Tab name="bar">Bar</Tab>
              <Tab name="baz">Baz</Tab>
            </Tabs>
          </Box> */}

        </Box>
        <Box width={"100%"} float={"left"}>
          <Text>
            Shortcuts: Exit/ctrl-z
    </Text>
      </Box>
    </FormContext.Provider>

  )
}

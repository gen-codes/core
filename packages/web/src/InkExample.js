import React, {useState, useEffect} from 'react'
import SchemaForm from "@gen-codes/ink-schema-form"
import {Box, Text} from 'ink'
import schema from "./schema"
import highlight from 'cli-highlight'
// import {Tabs, Tab} from 'ink-tab';

export const FormContext = React.createContext()

export default function CliForm(props) {
  // track which is the real activeField and Form instance
  // add horizontal nested Tab functionality with tabname = schema.property.identifier === true
  // const [stdout, setStdout] = useState("");
  const [formData, setData] = useState();
  // console.log(term)
  const code = `


  `
  // const {exit} = useApp()

  const hl = (text, lang) => highlight(text, {language: lang, ignoreIllegals: true})
  const [print, setPrint] = useState(false);
  const [tab, setTab] = useState("foo");
  const [currentForm, setCurrentForm] = useState("")
  return (
    <FormContext.Provider value={{currentForm, setCurrentForm}}>
      {formData &&<Box>{JSON.stringify(formData, undefined, 2)}</Box>}

      <Box flexDirection="column" alignItems="flex-end" justifyContent="space-between" textWrap="wrap">
        <Box flexDirection="row" alignItems="flex-end" justifyContent="space-between" textWrap="wrap">
          <Box width={"50%"} marginBottom={1} float={"left"} flexDirection={"column"}>
            <SchemaForm
              onSubmit={(data) => {setData(data)}}
              value={formData}
              objectType={"Element"}
              schema={schema}
            ></SchemaForm>
          </Box>
          <Box width={"100%"} height={"100%"} justifyContent={"flex-end"} textWrap="wrap" float={"right"} flexDirection="column">

            {tab === "foo" && <Text textWrap="wrap" >
              {hl(code, "js")}

            </Text>}
            {/* <Tabs onChange={setTab}>
              <Tab name="foo">Foo</Tab>
              <Tab name="bar">Bar</Tab>
              <Tab name="baz">Baz</Tab>
            </Tabs> */}
          </Box>

        </Box>
        <Box width={"100%"} float={"left"}>
          <Text>
            Shortcuts: Exit/ctrl-z
    </Text>
        </Box>
      </Box>
    </FormContext.Provider>

  )
}

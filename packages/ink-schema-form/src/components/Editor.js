import React, {useEffect, useState} from 'react'
import {Box, Text, InkTextInput} from '@gen-codes/ink-cli'
import {highlight} from 'cli-highlight'
import carlo from "carlo"
require("@babel/polyfill");
const hl = (text, lang) => highlight(text, {language: lang, ignoreIllegals: true})



const monacoToHighlight = {
  csharp: "cs",
  c: "cpp",
  html: "xml",
  "objective-c": "objectivec",
  "mysql": "sql"
}
const Editor = (props) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    if(show){
      const compProps = props.props || {}
      props.updateExternal({
        component: props.component,
        props: {
          value: props.value,
          onChange: props.onChange,
          onSubmit: props.onSubmit,
          ...compProps
        }
      })
    }
    return () => {
      if(show)
        props.updateExternal({})
    };
  }, [show])
  const lang = monacoToHighlight[props.type] || props.type
  return (
    <Box flexDirection={"column"}>
      <Box flexDirection={"row"} >
        <Text>Press Enter to Edit</Text>
        <InkTextInput
          value=""
          onChange={() => {}}
          onSubmit={() => setShow(true)}
        />

      </Box>


      {hl(props.value || " ", lang)}
    </Box>
  )
}

export default Editor;

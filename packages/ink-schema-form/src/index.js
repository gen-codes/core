import React, {useState, useEffect} from "react"
import ObjectField from "./fields/ObjectField"
import {
  useInput, Box, UncontrolledTextInput
} from "@gen-codes/ink-cli"
import Code from "./components/Code";
import useCarlo from "@gen-codes/use-carlo-react-hook"
export const FormContext = React.createContext()

export default function SchemaForm(props) {
  // const {} = useCarlo()
  const [code, setCode] =useState("")
  let updateExternal = ()=>{}
  if(props.externalEditor){
    updateExternal = useCarlo(props.externalEditor)
  }


  const [currentForm, setCurrentForm] = React.useState("")
  const [pressedKey, setPressedKey] = React.useState("")
  useInput((input, key) => {
    if(key.leftArrow || key.rightArrow || key.upArrow || key.downArrow) {
      setPressedKey(key)
    }
  });
  // return (
  //   <Code language={"javascript"}>
  //     const some
  //     lala somaoer
  //   </Code>
  // )
  return (
    <FormContext.Provider value={{currentForm, setCurrentForm, pressedKey, updateExternal}}>
      <ObjectField {...props} />
    </FormContext.Provider>
  )
}
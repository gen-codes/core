import React, {useState, useEffect} from "react"
import ObjectField from "./fields/ObjectField"
import {
  useInput, Box, UncontrolledTextInput
} from "@gen-codes/ink-cli"
import Code from "./components/Code";
import useCarlo from "@gen-codes/use-carlo-react-hook"
import deepGet from "./utils/deepGet";
import deepSet from "./utils/deepSet";
import logger from "./utils/logger";
export const FormContext = React.createContext()

export default function SchemaForm(props) {
  // const {} = useCarlo()
  // const [formData, setFormData] = useState(props.value|| {})
  const formData = props.value || {}
  const setFormData = props.onChange
  const [code, setCode] =useState("")
  
  const [currentForm, setCurrentForm] = React.useState("")
  const [pressedKey, setPressedKey] = React.useState("")
  useInput((input, key) => {
    if(key.leftArrow || key.rightArrow || key.upArrow || key.downArrow) {
      setPressedKey(key)
    }
  });
  let updateExternal = ()=>{}
  if(props.externalEditor){
    updateExternal = useCarlo(props.externalEditor)
  }

  // Fix for lagging if data depth higher than 4
  // the idea is to render only the most useful data 
  // and not the whole data tree.
  // useEffect(() => {
  //   if(currentForm.split(/[\.\[\]]/).length>4){
  //     // get the 3rd parent of the the currentForm
  //     // currentForm.split(".").slice()
  //     // using that data find the schema of the top parent node
  //     // and change objectType and formData
  //   }
  //   return () => {
  //     // cleanup
  //   };
  // }, [currentForm])
  const getField = (field)=>{
    const data = deepGet(formData, field)
    return data
  }
  const setField = (field, value) =>{
    const newFormData = deepSet(formData,field,value)
    setFormData(newFormData)
  }

  // return (
  //   <Code language={"javascript"}>
  //     const some
  //     lala somaoer
  //   </Code>
  // )
  return (
    <FormContext.Provider value={{
      config: props.config,
      currentForm, setCurrentForm, 
      pressedKey, updateExternal,
      getField, setField}}
    >
      {JSON.stringify(formData)}
      <ObjectField {...props} />
    </FormContext.Provider>
  )
}
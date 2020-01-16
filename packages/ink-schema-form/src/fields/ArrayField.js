import React, {useState, useContext, useEffect} from 'react'
import {AppContext, Box, Color, Text} from '@gen-codes/ink-cli'
import yaml from "js-yaml";
import TextInput from '../components/TextInput'
import SelectInput from '../components/SelectInput'
import MultiSelectInput from '../components/MultiSelectInput'
import Error from '../components/Error'
import Spinner from 'ink-spinner'
import Code from "../components/Code"
import CheckBox from '../components/Checkbox'
import ObjectField from './ObjectField'
import DisplayData from '../components/DisplayData';
import {FormContext} from "../index"
import log from "../utils/logger"

// Object

export default function ArrayField({prefix,...props}) {
  const {currentForm, setCurrentForm, pressedKey, getField,setField} = useContext(FormContext)
  const [formData, setData] = React.useState( getField(prefix) || [])
  // const formData = getField(prefix) || []
  const setFormData = (value) =>{
    setField(prefix, value)
    setData(getField(prefix))
  }
  const [[show, submitted, editDelete], setShowSubmittedDelete] = React.useState([true, false, null])
  const [activeObject, setActiveObject] = useState(formData.length - 1)
  const [editDeleteChoice, setEditDeleteChoice] = React.useState(0)
  const [editArrayItem, setEditArrayItem] = useState(false)

  const handleInput = (key) => {
    if(show) {
      if(key.upArrow && formData.length !== 0) {
        // setActiveObject(value => value-1)
        setShowSubmittedDelete([false, false, formData.length - 1])
      }
    } else if(editDelete !== null && !editArrayItem) {
      if(key.downArrow) {
        if(editDeleteChoice === 0) {
          return
        }
        if(editDelete !== formData.length - 1) {
          setShowSubmittedDelete([false, false, editDelete + 1])
          setActiveObject(editDelete + 1)
        } else {
          setShowSubmittedDelete([true, false, null])
        }
      }
      if(key.upArrow) {
        if(editDeleteChoice === 1) {
          return
        }
        if(editDelete !== 0) {
          setActiveObject(editDelete - 1)
          setShowSubmittedDelete([false, false, editDelete - 1])
        }
      }
    }
  }
  useEffect(() => {

    handleInput(pressedKey)

  }, [pressedKey])


  // useInput(handleInput);
  const onContinueAnswer = (answer) => {
    if(answer) {
      props.onSubmit()
    } else {
      setActiveObject(v => v + 1)
      setShowSubmittedDelete([false, submitted, null])
    }
  }
  let Children;
  let Question;
  let EditDelete;

  let beforeData
  if(editArrayItem) {
    beforeData = formData.slice(0, editDelete)
  } else {
    beforeData = formData.slice(0, editDelete + 1)
  }
  const BeforeData = (
    <DisplayData
      formData={editDelete === null ? formData : beforeData}
      objectType={props.objectType} />
  )
  const AfterData = (
    editDelete !== null &&
    <DisplayData
      formData={formData.slice(editDelete + 1)}
      objectType={props.objectType}
      countFrom={editDelete + 2}
    />

  )
  const onEditDeleteAnswer = (answer) => {
    if(answer ) {
      // edit
      setEditArrayItem(true)
    } else {
      // delete
      const newFormData = formData.filter((item, index) => index !== editDelete)
      setFormData(newFormData)
      // props.onChange(newFormData)
      setActiveObject(newFormData.length - 1)
      if(newFormData.length === 0) {
        setShowSubmittedDelete([true, false, null])
      } else {
        if(editDelete === 0) {
          handleInput({downArrow: true})
        } else {
          handleInput({upArrow: true})
        }
      }
    }
  }

  if((!submitted && !show && editDelete === null) || editArrayItem) {
    Children = (
      <ObjectField
        {...props}
        // value={formData[activeObject]}
        prefix={`${prefix}[${activeObject}]`}
        onSubmit={() => {
            if(editArrayItem) {
              setEditArrayItem(false)
              setEditDeleteChoice(0)
  
            } else {
              setData(getField(prefix))
              setShowSubmittedDelete([true, submitted, null])
            }
        }}
        // onChange={(data) => {
        //   if(data){
        //     formData[activeObject] = data
        //     setFormData(formData)
        //   }
        //   // setCurrentFormItem(data)
        // }}
      />
    )
  } else if(!submitted && show) {
    Question = (
      <CheckBox
        onFocus={() => {}}
        onBlur={() => {}}
        onSubmit={() => {}}
        onChange={onContinueAnswer}
        trueString={formData.length === 0 ? "Next" : "Back"}
        falseString={`New ${props.objectType} +`}
      />
    )
  }
  if(editDelete !== null && !editArrayItem) {
    EditDelete = (
      <CheckBox
        onHighlight={({label}) => {
          setEditDeleteChoice(["Delete x", "Edit"].indexOf(label))
        }}
        onFocus={() => {}}
        onBlur={() => {}}
        onSubmit={() => {}}
        onChange={onEditDeleteAnswer}
        trueString={"Edit"}
        falseString={"Delete x"}
      />
    )
  }

  return (
    <Box flexDirection="column">
      {BeforeData}
      <Box flexDirection={"column"}>
        {Children}
      </Box>
      {EditDelete}
      {AfterData}
      {Question}
    </Box>

  )
}

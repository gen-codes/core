import React, {useState} from 'react'
import {InkTextInput} from '@gen-codes/ink-cli'
import Editor  from "./Editor"

export default function TextInput({ onBlur, onFocus, ...props }) {
 
  const [value, setValue] = useState(props.value||"")
  return <InkTextInput
    value={value}
    onChange={setValue}
    onSubmit={()=>{
      props.onChange(value)
      props.onSubmit(value)
    }}
  />
	// return <UncontrolledTextInput {...props}
	// onSubmit={(value)=>{
	// 	props.onChange(value)
	// 	props.onSubmit()
	// }}
	// showCursor />
}

import React, {useState} from 'react'
import InkTextInput from 'ink-text-input'
import {UncontrolledTextInput} from 'ink-text-input';
import open from "open"
export default function TextInput({ onBlur, onFocus, ...props }) {
	React.useEffect(() => {
		// open('https://sindresorhus.com');
		onFocus()
		return ()=>{
      onBlur()
    }
  }, [onFocus, onBlur])
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

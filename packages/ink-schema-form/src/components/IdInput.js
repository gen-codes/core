import React from 'react'
import {InkTextInput} from '@gen-codes/ink-cli'
import {getId} from '../utils/getId';
export default function IdInput({ onBlur, onFocus, ...props }) {
	React.useEffect(() => {
		props.onSubmit(getId())
		// onFocus()
		// return onBlur
	}, [onFocus, onBlur])
	return <></>
	return <InkTextInput  {...props} onChange={()=>{}} showCursor />
}

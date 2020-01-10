import React from 'react'
import SelectInput from './SelectInput'

export default function CheckBox({trueString, falseString,...props}) {
	return (
		<SelectInput
      {...props}
      value={JSON.stringify(props.value)}
      onChange={(value)=>{
        if(value==="false"){
          props.onChange(false)
        }else{
          props.onChange(true)
        }
      }}
      onSubmit={()=>{
        props.onSubmit()
      }}
			items={[
				{
					label: falseString || "False", value: "false"
				},
				{
				label: trueString || "True", value: "true"
			},
		]}
		/>
	)
}

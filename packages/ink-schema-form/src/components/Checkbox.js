import React from 'react'
import SelectInput from './SelectInput'

export default function CheckBox({trueString, falseString,...props}) {
	return (
		<SelectInput
			{...props}
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

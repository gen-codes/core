import React from 'react'
import {Color, Text,InkSelectInput} from '@gen-codes/ink-cli'

export default function SelectInput({
	onSubmit,
	onBlur,
	onChange,
	onFocus,
	...props
}) { 

	return (
		<InkSelectInput
			{...props}
			itemComponent={({isSelected, label})=>{
				return (<Text bold={isSelected}>
					<Color white={isSelected}
					>{label}</Color>
					</Text>)
			}}
      color={"red"}
      initialIndex={props.value && props.items.findIndex(item=>item.value===props.value)}
			onSelect={({ value }) => {
				onChange(value)
				onSubmit(value)
			}}
		/>
	)
}

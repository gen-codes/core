import React from 'react'
import InkSelectInput from 'ink-select-input'
import {Color, Text} from 'ink'

export default function SelectInput({
	onSubmit,
	onBlur,
	onChange,
	onFocus,
	...props
}) {
	React.useEffect(() => {
		onFocus()
		return onBlur
	}, [onFocus, onBlur])
	return (
		<InkSelectInput
			{...props}
			itemComponent={({isSelected, label})=>{
				return (<Text bold={isSelected}>
					<Color white={isSelected}
					>{label
					}</Color>
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

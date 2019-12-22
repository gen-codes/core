import React, {useState} from 'react'
import InkMultiSelect from 'ink-multi-select'
import {Box} from 'ink'

export default function SelectInput({
	onBlur,
	onChange,
	onFocus,
	...props
}) {
	React.useEffect(() => {
		onFocus()
		return onBlur
	}, [onFocus, onBlur])
	const [arr, setArr] = useState(props.value||[])
	return (
    <Box>
      <InkMultiSelect
        {...props}
        onSubmit={()=>{
          onChange(arr)
          props.onSubmit(arr) 
        }}
        selected={arr.map(v=>({value: v}))}
        onSelect={({ value: v }) => setArr(arr.concat([v]))}
        onUnselect={({ value: v }) => setArr(arr.filter(item => item !== v))}
      />

    </Box>
	)
}

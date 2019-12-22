import React from 'react'
import {Box, Text} from 'ink'
import {highlight} from 'cli-highlight'
import InkTextInput from 'ink-text-input'
// import TextInput from "ink-text-input"
const hl = (text,lang)=>highlight(text, {language: lang, ignoreIllegals: true})
const CodeLine = ({value, index, lang}) => {
	const [lineValue, setLineValue] = React.useState(value)

	return (
		<InkTextInput
			showCursor
			onChange={setLineValue}
			// value={hl(lineValue, lang)}
			value={lineValue}
			/>
	)
}
export default function Code({onBlur, onFocus, ...props}) {
	React.useEffect(() => {
		onFocus()
		return onBlur
	}, [onFocus, onBlur])
	const value = props.children || props.value
	const children = value.split("\n").map((text, index) => (
		<CodeLine
			key={text + index}
			value={text}
			index={index}
			lang={props.language}
		/>
	))
	return <Box >{children}</Box>
}

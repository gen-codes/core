import React, {useState, useEffect} from 'react'
import {Box, Text, InkTextInput, useInput} from '@gen-codes/ink-cli'
import {highlight} from 'cli-highlight'
const hl = (text, lang) => highlight(text, {language: lang, ignoreIllegals: true})


const CodeLine = ({value, onChange, index, active, lang, onSubmit, cursorOffset}) => {
  const [lineValue, setLineValue] = React.useState(value)
  const onSetLine = (line, offset) =>{
    onChange(line, offset)
    if(line!==lineValue)
    setLineValue(line)
  }
  if(active) {
    return (
      <InkTextInput
        showCursor
        cursorOffset={cursorOffset}
        onChange={onSetLine}
        // value={hl(lineValue, lang)}
        onSubmit={() => onSubmit()}
        value={lineValue}
      />
    )
  }
  return <Box>{lineValue}</Box>
}
export default function Code({onBlur, onFocus, ...props}) {
  const value = props.children || props.value
  const [cursor, setCursor] = useState(0)
  const [cursorOffset, setOffset] = useState(0)
  const [lines, setLines] = useState(value.split("\n"))
  useInput((input, key) => {
    if(key.upArrow && cursor !== 0) {
      setCursor(cursor - 1)
    }
    if(key.downArrow && cursor !== lines.length - 1) {

      setCursor(cursor + 1)
    }
    // if(key.leftArrow || key.rightArrow || key.upArrow || key.downArrow) {
    //   // setPressedKey(key)
    // }
  });
  const children = lines.map((text, index) => (
    <CodeLine
      key={text + index}
      value={text}
      index={index}
      cursorOffset={cursorOffset}
      onChange={(value, offset) => setLines(changedLines => {
        changedLines[index] = value
        setOffset(offset)
        return changedLines
      })}
      onSubmit={() => setLines(addedLines => {
        addedLines = addedLines.slice(0, cursor + 1).concat([`${cursor + 1}:`]).concat(addedLines.slice(cursor + 1))
        setCursor(cursor + 1)
        return addedLines
      })}
      active={index === cursor}
      lang={props.language}
    />
  ))
  return <Box flexDirection={"column"}>  {children}</Box>
}

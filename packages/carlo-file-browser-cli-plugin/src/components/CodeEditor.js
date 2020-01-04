import React, {useState} from "react";
import MonacoEditor from "react-monaco-editor";
import useKeyPress from "../useKeyPress"

const Editor = (props) => {
  const [value, setValue] = useState(props.value)
  const pressedKey = useKeyPress("ctrl-enter")
  if(pressedKey) {
    props.onChange(value)
    props.onSubmit()
  }
  return (
    <MonacoEditor
      height="600"
      language={props.lang}
      theme="vs-dark"
      value={value}
      onChange={setValue}
      editorDidMount={(editor, monaco) => {editor.focus()}}
    />
  )
}


export default Editor;

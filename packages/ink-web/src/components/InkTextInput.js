
import React from "react";
import useInput from "../hooks/useInput"
export default function InkTextInput(props) {
  useInput((input, key) => {
    console.log(key)
    if(key.enter) {
      props.onSubmit()
    }
  })
  return <input onChange={(e) => props.onChange(e.target.value)}></input>
}
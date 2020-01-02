
import React from "react";

export default function Text (props){
  const fontWeight = props.bold && "bold" 
  return(
    <span  style={{fontWeight}} />
  )
}
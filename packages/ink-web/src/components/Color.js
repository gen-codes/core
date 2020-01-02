
import React from "react";

export default function Box (props){
  const color = Object.keys(props)[0]
  return(
    <span  style={{color}} />
  )
}
import React from "react"
import ObjectField from "./fields/ObjectField"
import EventEmitter from "events"
export const FormContext = React.createContext()
const emitter = new EventEmitter()
emitter.setMaxListeners(100)
export default function SchemaForm(props){
	const [currentForm, setCurrentForm] = React.useState("")
	return (
		<FormContext.Provider value={{currentForm, setCurrentForm}}>
      <ObjectField {...props}/>
    </FormContext.Provider> 
 ) 
}
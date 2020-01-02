import React, {useEffect, useState} from 'react'
import carlo from "carlo"
import "core-js/stable";
import "regenerator-runtime/runtime";
function getId() {
	return Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.substr(2, 10);
}

const parseResponse = (func) => {
  return (answer) => {
    try {
      const obj = JSON.parse(answer)
      if(obj.args) {
        return func(obj.args[0])
      } else {

      }

    } catch(er) {
      return func(answer)
    }
  }
}
export default function useCarlo (path) {
  const [{component, props, options}, update] = useState({})
  // const [component, setComponent] = useState()
  const [window, setWindow] = useState()
  const [app, setApp] = useState()
  const [loaded, setLoaded] = useState(false)
  const [minimized, setMinimized] = useState(false)
  
  const functions = {}
  if(!component && window && !minimized){
    window.minimize()
    setMinimized(true)
  }
  if(component && window && minimized){
    window.bringToFront()
    setMinimized(false)
  }
  useEffect(() => {
    const launch = async () => {

      const carloApp = await carlo.launch({
        width: 500,
        height: 300,
        right: 50,
        bottom: 100
      })
      // app.on("exit",()=>{modified && onSubmit()})
      await carloApp.serveFolder(path);
      await carloApp.load('index.html');
      const window = carloApp.windows()[0]
      setApp(carloApp)
      setWindow(window)
      carloApp.exposeFunction("setCarloLoaded", () => setLoaded(true));
    }
    launch()
    return () => {
      app.exit()
    };
  }, [])
  useEffect(() => {
    if(!app || !window ) return
    const loadComponent = async () =>{
      const scalarProps = {}
      for(const p in props) {
        if(typeof (props[p]) === "function") {
          const funcId = getId()
          await app.exposeFunction(funcId, parseResponse(props[p]));
          functions[p] = funcId
        } else {
          scalarProps[p] = props[p]
        }
      }
      
      window.evaluate(`
        window.dispatchEvent(new CustomEvent('component',{
          detail: ${JSON.stringify({
        scalarProps,
        functions,
        component: component || "Empty"
      })}}))`)
    }
    loadComponent()
    return () => {
    };
  }, [component, props, loaded, app])
  return update
}
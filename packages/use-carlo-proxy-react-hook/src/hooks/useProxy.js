import {useEffect, useState} from "react"
// window.ComponentEvent = new CustomEvent("component")
// window.UpdateEvent = new CustomEvent("update")
// window.EmptyEvent = new CustomEvent("empty")
const useProxy = ()=>{
  const [loaded, setLoaded] = useState(false)
  const [{props, component}, setState] = useState({props:null , component: null})

  
  useEffect(()=>{
    if(!loaded){
      window.setCarloLoaded && window.setCarloLoaded()
      setLoaded(true)
    } 

    window.addEventListener("component", (e)=>{
      const newProps = {...e.detail.scalarProps}
      if(e.detail.functions){
        for(const funcName in e.detail.functions){
          const funcId = e.detail.functions[funcName]
          newProps[funcName] = (...args)=>setTimeout(window[funcId](...args), 100)
        }
      }
      setState({component: e.detail.component, props: newProps})
    })
  },[ loaded])
  return {
    component, props
  }
}
export default useProxy;
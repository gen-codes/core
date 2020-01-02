import React from 'react';
import ReactDOM from 'react-dom';
import useProxy from '@gen-codes/use-carlo-proxy-react-hook';
import Components from "./components"
const ProxyComponent = () => {
  let Component
  const {component, props} = useProxy()
  if(component){
    Component = Components[component]
  }
  console.log(props)
  if(!component || !Component || !props) {
    return (
      <div>
        Empty..
    </div>
    )
  }
  return (
    <div>
      <Component {...props}></Component>
    </div>
  )

}

ReactDOM.render(<ProxyComponent />, document.getElementById('root'));


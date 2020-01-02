import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

if (!global.process) {
  global.process = {
    env: {
      FORCE_COLOR: '1',
    },
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

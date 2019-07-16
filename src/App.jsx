import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
  <>
    <div>Hello world!</div>
  </>
)

const container = document.createElement('div')

document.body.appendChild(container)

ReactDOM.render(<App />, container)
import React from 'react'
import ReactDOM from 'react-dom'
import Photofeed from './pages/Photofeed'
import './app.scss'

const container = document.createElement('div')

document.body.appendChild(container)

ReactDOM.render(<Photofeed />, container)
import React from 'react'
import classnames from 'classnames'
import { on } from './emitter'
import { SHOW } from './event'
import css from './notification.scss'

class Notification extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      message: undefined,
      show: false
    }

    this.onClick = this.onClick.bind(this)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
  }

  componentDidMount () {
    on(SHOW, this.show)
  }

  componentWillUnmount () {
    this.clear()
  }

  onClick () {
    this.clear()
    this.hide()
  }

  show (message) {
    this.setState({
      message,
      show: true
    }, () => {
      this.clear()

      this.timer = window.setTimeout(this.hide, 3000)
    })
  }

  hide () {
    this.setState({ show: false })
  }

  clear () {
    if (this.timer) {
      window.clearTimeout(this.timer)
    }
  }

  getClasses () {
    const { show } = this.state

    return classnames(css.notification__container, {
      [css.show]: show
    })
  }

  render () {
    const { message } = this.state

    return (
      <div className={css.notification}>
        <div
          className={this.getClasses()}
          onClick={this.onClick}
        >
          <span>{message}</span>
        </div>
      </div>
    )
  }
}

export default Notification
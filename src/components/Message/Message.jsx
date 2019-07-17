import React from 'react'
import PropTypes from 'prop-types'
import css from './message.scss'

const Message = ({ message }) => (
  <div className={css.message}>
    <span>{message}</span>
  </div>
)

Message.propTypes = {
  /**
   * Message
   */
  message: PropTypes.string.isRequired
}

export default Message
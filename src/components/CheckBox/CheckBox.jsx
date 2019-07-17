import React from 'react'
import PropTypes from 'prop-types'
import css from './checkbox.scss'

const getIcon = checked => checked ? <i className='fas fa-check-circle' /> : <i className='far fa-check-circle' />

const CheckBox = ({
  label,
  checked,
  onClick
}) => (
  <div
    role='checkbox'
    className={css.checkbox}
    onClick={() => onClick(!checked)}
  >
    {getIcon(checked)}
    <span>{label}</span>
  </div>
)

CheckBox.propTypes = {
  /**
   * Label
   */
  label: PropTypes.string.isRequired,
  /**
   * Checked
   */
  checked: PropTypes.bool.isRequired,
  /**
   * onClick
   */
  onClick: PropTypes.func.isRequired
}

export default CheckBox
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.css'
import { ThemeContext } from '../ThemeContext/ThemeContext'

const Input = ({ label, type, name, value, onChange, span }) => {
  const [inputState, setInputState] = useState('inactive')

  const handleBlur = () => {
    setInputState('inactive')
  }

  const handleFocus = () => {
    setInputState('focused')
  }

  const theme = useContext(ThemeContext)

  const inputStyles = () => {
    const bg = theme.whitesnow

    if (inputState === 'inactive') {
      return {
        background: bg,
        border: `1px solid transparent`,
      }
    } else if (inputState === 'focused') {
      return {
        background: bg,
        border: `1px solid ${theme.main}`,
      }
    }
  }

  const spanStyles = () => {
    if (inputState === 'inactive') {
      return {
        background: theme.whitesmoke,
        color: theme.gray,
      }
    } else {
      return {
        background: theme.main,
        color: theme.white,
      }
    }
  }

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
        className={styles.input}
        style={inputStyles()}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <span style={spanStyles()} className={styles.inputValue}>
        {span}
      </span>
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'number',
    'password',
    'date',
    'email',
    'tel',
    'url',
    'search',
  ]).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  span: PropTypes.string,
}

export default Input

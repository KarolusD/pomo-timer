import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Input.module.css'
import { ThemeContext } from '../ThemeContext/ThemeContext'

const Input = ({
  label,
  type,
  name,
  value,
  error,
  errorMessage,
  onChange,
  span,
  disabled,
}) => {
  const [inputState, setInputState] = useState('inactive')

  const handleBlur = () => {
    if (error) {
      setInputState('error')
    } else {
      setInputState('inactive')
    }
  }

  const handleFocus = () => {
    setInputState('focused')
  }

  const handleError = () => {
    setInputState('error')
  }

  useEffect(() => {
    if (error) {
      handleError()
    } else if (inputState !== 'inactive') {
      handleFocus()
    }
  }, [error, inputState])

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
    } else if (inputState === 'error') {
      return {
        background: bg,
        border: `1px solid ${theme.error}`,
      }
    }
  }

  const spanStyles = () => {
    if (inputState === 'inactive') {
      return {
        background: theme.whitesmoke,
        color: theme.gray,
      }
    } else if (inputState === 'error') {
      return {
        background: theme.error,
        color: theme.white,
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
        disabled={disabled ? true : false}
      />

      <span style={spanStyles()} className={styles.inputValue}>
        {span}
      </span>

      {error && (
        <span style={{ color: theme.error }} className={styles.error}>
          {errorMessage}
        </span>
      )}
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
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
}

export default Input

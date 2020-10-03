import React from 'react'
import styles from './Button.module.css'
import { ThemeContext } from '../ThemeContext/ThemeContext'

const Button = ({ label, primary, handleClick, ...props }) => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => {
        if (primary) {
          return (
            <button
              onClick={handleClick}
              className={styles.btn}
              style={{
                background: theme.main,
                color: theme.white,
                display: props.timerRuns ? 'none' : 'block',
              }}
            >
              {label}
            </button>
          )
        } else {
          return (
            <button
              onClick={handleClick}
              className={styles.btn}
              style={{
                border: `2px solid ${theme.white}`,
                color: theme.main,
              }}
            >
              {label}
            </button>
          )
        }
      }}
    </ThemeContext.Consumer>
  )
}

export default React.memo(Button)

import React, { useContext } from 'react'
import { Transition } from 'react-transition-group'
import styles from './ToggleButton.module.css'
import { ThemeContext } from '../ThemeContext/ThemeContext'

const ToggleButton = ({ toggleState, handleToggleState }) => {
  const theme = useContext(ThemeContext)

  const transitionStyles = {
    entering: { transform: 'translateX(26px)' },
    entered: { transform: 'translateX(26px)' },
    exiting: { transform: 'translateX(0)' },
    exited: { transform: 'translateX(0)' },
  }

  const handleClick = () => {
    handleToggleState()
  }

  return (
    <button
      style={{ background: toggleState ? theme.main : theme.whitesmoke }}
      className={styles.toggleButton}
      onClick={handleClick}
    >
      <Transition in={toggleState} timeout={500}>
        {(state) => (
          <span
            style={{ background: theme.white, ...transitionStyles[state] }}
            className={styles.switch}
          />
        )}
      </Transition>
    </button>
  )
}

export default ToggleButton

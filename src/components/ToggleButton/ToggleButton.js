import React, { useState } from 'react'
import { Transition } from 'react-transition-group'
import styles from './ToggleButton.module.css'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'

const ToggleButton = ({ toggleState, handleToggleState }) => {
  //const [isOn, setIsOn] = useState(toggleState)

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
    <ThemeContextConsumer>
      {(theme) => (
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
      )}
    </ThemeContextConsumer>
  )
}

export default ToggleButton

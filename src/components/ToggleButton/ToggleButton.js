import React, { useState } from 'react'
import { Transition } from 'react-transition-group'
import styles from './ToggleButton.module.css'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'

const ToggleButton = ({ on = false }) => {
  const [isOn, setIsOn] = useState(on)

  const transitionStyles = {
    entering: { transform: 'translateX(26px)' },
    entered: { transform: 'translateX(26px)' },
    exiting: { transform: 'translateX(0)' },
    exited: { transform: 'translateX(0)' },
  }

  const handleClick = () => {
    setIsOn(!isOn)
  }

  return (
    <ThemeContextConsumer>
      {(theme) => (
        <button
          style={{ background: isOn ? theme.main : theme.whitesmoke }}
          className={styles.toggleButton}
          onClick={() => setIsOn(!isOn)}
        >
          <Transition in={isOn} timeout={500}>
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

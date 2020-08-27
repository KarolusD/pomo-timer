import React from 'react'
import Icon from '../Icon/Icon'
import playIcon from '../../assets/icons/play.svg'
import stopIcon from '../../assets/icons/stop.svg'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'
import styles from './PlayButton.module.css'

const PlayButton = ({ timerRuns, handleClick }) => {
  return (
    <ThemeContextConsumer>
      {(theme) => (
        <button
          style={{ color: theme.main }}
          className={styles.playButton}
          onClick={handleClick}
        >
          <Icon src={timerRuns ? stopIcon : playIcon} fill={theme.main} />
          <label>{timerRuns ? 'pause timer' : 'continue'}</label>
        </button>
      )}
    </ThemeContextConsumer>
  )
}

export default PlayButton

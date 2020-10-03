import React from 'react'
import Icon from '../Icon/Icon'
import playIcon from '../../assets/icons/play.svg'
import stopIcon from '../../assets/icons/stop.svg'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import styles from './PlayButton.module.css'

const PlayButton = ({ timerRuns, handleClick }) => {
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <button
          style={{ color: theme.main }}
          className={styles.playButton}
          onClick={handleClick}
        >
          <Icon src={timerRuns ? stopIcon : playIcon} fill={theme.main} />
          <label>{timerRuns ? 'pause timer' : 'continue'}</label>
        </button>
      )}
    </ThemeContext.Consumer>
  )
}

export default React.memo(PlayButton)

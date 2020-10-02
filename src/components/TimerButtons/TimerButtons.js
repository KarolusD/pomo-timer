import React from 'react'
import Button from '../Button/Button'
import PlayButton from '../PlayButton/PlayButton'
import styles from './TimerButtons.module.css'

const TimerButtons = ({
  timerState,
  timerRuns,
  timerEnds,
  pomoStart,
  handleTimer,
  handleTimerStopOrPlay,
  handleTimerQuit,
}) => {
  const handleButtonDisplay = () => {
    const startButton = (
      <Button
        primary
        label={timerState === 'pomo' ? 'start pomo' : 'start break'}
        handleClick={handleTimer}
      />
    )
    const quitButton = <Button label='quit' handleClick={handleTimerQuit} />
    const playButton = (
      <PlayButton timerRuns={timerRuns} handleClick={handleTimerStopOrPlay} />
    )

    if (!pomoStart) {
      return <>{startButton}</>
    } else {
      if (timerRuns) {
        return (
          <>
            {playButton}
            {quitButton}
          </>
        )
      } else if (!timerRuns) {
        if (!timerEnds) {
          return (
            <>
              {playButton}
              {quitButton}
            </>
          )
        } else {
          return (
            <>
              {startButton}
              {quitButton}
            </>
          )
        }
      }
    }
  }
  return <div className={styles.btnContainer}>{handleButtonDisplay()}</div>
}

export default TimerButtons

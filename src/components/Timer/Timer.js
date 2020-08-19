import React, { useRef, useState, useEffect } from 'react'
import styles from './Timer.module.css'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'

const Timer = ({ startingTimerTime, handleTimerState, handleTimerRuns }) => {
  const [currentTime, setCurrentTime] = useState(startingTimerTime)

  useEffect(() => {
    setCurrentTime(startingTimerTime)
  }, [startingTimerTime])

  const startTimer = (timestamp, startTime, duration) => {
    let runTime = (timestamp - startTime) / 1000 // conversion to seconds

    setCurrentTime(startingTimerTime - runTime.toFixed())

    if (runTime < duration) {
      requestAnimationFrame((timestamp) => {
        startTimer(timestamp, startTime, duration)
      })
    } else {
      handleTimerState() // pomo or break ?
      handleTimerRuns() // timer stop or start
    }
  }

  const handleTimer = () => {
    requestAnimationFrame((timestamp) => {
      handleTimerRuns()
      const startTime = timestamp || new Date().getTime()
      startTimer(timestamp, startTime, startingTimerTime)
    })
  }

  const donutTimer = useRef()
  return (
    <ThemeContextConsumer>
      {(theme) => (
        <div className={styles.timerContainer}>
          <figure
            className={styles.timer}
            style={{ background: theme.white }}
            onClick={handleTimer}
          >
            <svg
              width='100%'
              height='100%'
              viewBox='0 0 42 42'
              className='timer'
              aria-labelledby='timer-title timer-desc'
              role='img'
            >
              <title id='beers-title'>Pomodoro timer</title>
              <desc id='beers-desc'>
                Pomodoro timer is showing how much time left to the end of focus
                or relax break
              </desc>
              <circle
                className='timer-ring'
                cx='21'
                cy='21'
                r='19'
                fill='transparent'
                style={{ stroke: theme.lightMain }}
                strokeWidth='4'
              ></circle>

              <circle
                className='timer-segment'
                cx='21'
                cy='21'
                r='19'
                fill='transparent'
                style={{ stroke: theme.main }}
                strokeWidth='4'
                strokeDasharray='80 20'
                strokeDashoffset='11'
                strokeLinecap='round'
                ref={donutTimer}
              ></circle>
            </svg>
            <h1 style={{ color: theme.main }} className={styles.time}>
              {currentTime}
            </h1>
          </figure>
        </div>
      )}
    </ThemeContextConsumer>
  )
}

export default Timer

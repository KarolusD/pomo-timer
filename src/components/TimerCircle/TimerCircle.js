import React, { useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import TimeDisplay from '../TimeDisplay/TimeDisplay'
import styles from './TimerCircle.module.css'

const TimerCircle = ({ setTimerCircleRef, currentTime }) => {
  const theme = useContext(ThemeContext)
  const timerCircleRef = useRef()

  useEffect(() => {
    setTimerCircleRef(timerCircleRef)
  }, [setTimerCircleRef])

  return (
    <figure className={styles.timer} style={{ background: theme.white }}>
      <svg
        width='100%'
        height='100%'
        viewBox='0 0 42 42'
        className='timer'
        aria-labelledby='timer-title timer-desc'
        role='img'
      >
        <title id='timer-title'>Pomodoro timer</title>
        <desc id='timer-desc'>
          Pomodoro timer is showing how much time left to the end of focus or
          relax break
        </desc>
        <circle
          className={styles.timerRing}
          cx='21'
          cy='21'
          r='19'
          fill='transparent'
          style={{ stroke: theme.lightMain }}
        ></circle>

        <circle
          className={styles.timerSegment}
          cx='21'
          cy='21'
          r='19'
          fill='transparent'
          style={{ stroke: theme.main }}
          ref={timerCircleRef}
        ></circle>
      </svg>
      <TimeDisplay currentTime={currentTime} />
    </figure>
  )
}

export default TimerCircle

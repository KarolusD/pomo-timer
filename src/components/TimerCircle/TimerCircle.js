import React, { useContext, useEffect, useRef } from 'react'
import { useCallback } from 'react'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import TimeDisplay from '../TimeDisplay/TimeDisplay'
import Icon from '../Icon/Icon'
import styles from './TimerCircle.module.css'
import tomato from '../../assets/icons/tomato.svg'

const TimerCircle = ({
  setTimerCircleRef,
  currentTime,
  isTimeDisplay,
  smallTimer,
  fullProgress,
  filled,
  ifNumber,
  number,
  pomosGoal,
  passedPomos,
}) => {
  const { theme } = useContext(ThemeContext)

  const timerCircleRef = useRef()

  useEffect(() => {
    if (typeof setTimerCircleRef == 'function') {
      setTimerCircleRef(timerCircleRef)
    }
  }, [currentTime, setTimerCircleRef])

  const handleTimerAnimation = useCallback(() => {
    const radius = timerCircleRef.current.r.baseVal.value
    const perimeter = Math.ceil(2 * Math.PI * radius)
    if (fullProgress > 1) {
      timerCircleRef.current.style.strokeDashoffset = perimeter
    } else if (filled) {
      timerCircleRef.current.style.strokeDashoffset = 0
    } else {
      let arc = (perimeter * (1 - fullProgress)).toFixed(3)
      timerCircleRef.current.style.strokeDashoffset = arc
    }
  }, [filled, fullProgress])

  useEffect(() => {
    handleTimerAnimation()
  }, [fullProgress, handleTimerAnimation])

  return (
    <figure
      className={smallTimer ? styles.smallTimer : styles.timer}
      style={{ background: theme.white }}
    >
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
      {isTimeDisplay && <TimeDisplay currentTime={currentTime} />}

      {ifNumber
        ? smallTimer && (
            <p
              className={styles.number}
              style={{ color: theme.main, width: '48px', textAlign: 'center' }}
            >
              {pomosGoal - passedPomos > 0
                ? `x${number}`
                : `+ ${passedPomos - 4}`}
            </p>
          )
        : smallTimer && (
            <div
              style={{ width: '32px', height: '32px' }}
              className={styles.tomato}
            >
              <Icon src={tomato} />
            </div>
          )}
    </figure>
  )
}

export default TimerCircle

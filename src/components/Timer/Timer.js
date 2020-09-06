import React, { useRef, useState, useEffect, useContext } from 'react'
import styles from './Timer.module.css'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'
import Button from '../Button/Button'
import PlayButton from '../PlayButton/PlayButton'
import { MenuContext } from '../MenuContext/MenuContext'

const Timer = ({
  handleTimerState,
  handleTimerReset,
  handleTimerRuns,
  handleTimerEnds,
  handlePomoStart,
  handlePassedPomos,
  startingTimerTime,
  timerState,
  timerRuns,
  timerEnds,
  pomoStart,
}) => {
  const menuContext = useContext(MenuContext)
  const {
    autoStartPomo,
    autoStartBreak,
    handleRingtone,
    pomoTime,
    breakTime,
  } = menuContext

  const [currentTime, setCurrentTime] = useState(pomoTime)
  const [fullRunTime, setFullRunTime] = useState(0)

  const timerRef = useRef()
  const rAF = useRef()

  useEffect(() => {
    // Setting starting timer time
    if (timerEnds || !pomoStart) {
      setCurrentTime(startingTimerTime)
    }
  }, [pomoStart, startingTimerTime, timerEnds, timerState])

  useEffect(() => {
    // Auto starting pomo
    if (timerState === 'pomo' && autoStartPomo && pomoStart) {
      handleTimer()
    }

    // Auto starting break
    if (timerState === 'break' && autoStartBreak) {
      handleTimer()
    }

    if (timerState === 'pomo' && !autoStartPomo) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState])

  useEffect(() => {
    if (timerEnds) {
      handleRingtone(timerState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerEnds, timerState])

  const startTimer = (timestamp, startTime, duration, startRunTime) => {
    let currentRunTime = (timestamp - startTime) / 1000 // conversion to seconds
    let runTime = currentRunTime + startRunTime
    let progress = runTime / duration

    handleTimerAnimation({ progress })

    setFullRunTime(runTime)
    setCurrentTime(startingTimerTime - runTime)

    if (!pomoStart) {
      handlePomoStart()
    }

    if (runTime < duration) {
      rAF.current = requestAnimationFrame((timestamp) => {
        startTimer(timestamp, startTime, duration, startRunTime)
      })
    } else {
      handleTimerEnding()
    }
  }

  const handleTimer = () => {
    rAF.current = requestAnimationFrame((timestamp) => {
      handleTimerEnds(false)
      handleTimerRuns(true)
      const startTime = timestamp || performance.now() || Date.now()
      const startRunTime = fullRunTime
      startTimer(timestamp, startTime, startingTimerTime, startRunTime)
    })
  }

  const handleTimerAnimation = ({ progress }) => {
    const radius = timerRef.current.r.baseVal.value
    const perimeter = Math.ceil(2 * Math.PI * radius)

    if (progress >= 1) {
      timerRef.current.style.strokeDashoffset = perimeter
    } else {
      let arc = (perimeter * (1 - progress)).toFixed(3)
      timerRef.current.style.strokeDashoffset = arc
    }
  }

  const handleTimerStopOrPlay = async () => {
    if (timerRuns) {
      await handleTimerRuns(false)
      console.log('---------------stop------------------')
      cancelAnimationFrame(rAF.current) // canceling the animation
    } else {
      handleTimer()
    }
  }

  const handleTimerQuit = () => {
    cancelAnimationFrame(rAF.current) // canceling the animation
    handleTimerAnimation({ progress: 1 }) // reseting timer dasharray
    handleTimerReset() // reseting timer state
    setCurrentTime(startingTimerTime) // reseting current time
    setFullRunTime(0) // reseting run time
  }

  const handleTimerEnding = async () => {
    setFullRunTime(0) // reseting run time
    cancelAnimationFrame(rAF.current) // canceling the animation
    if (timerState === 'pomo') {
      await handlePassedPomos() // adding 1 to passed pomos
    }
    handleTimerState() // pomo or break
    handleTimerRuns(false) // timer stop
    handleTimerEnds(true) // timer is at 0:00
  }

  const handleButtonDisplay = () => {
    const { autoStartPomo, autoStartBreak } = menuContext

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
      if ((timerRuns || !timerRuns) && !timerEnds) {
        return (
          <>
            {playButton}
            {quitButton}
          </>
        )
      } else if (timerEnds) {
        return (
          <>
            {startButton}
            {quitButton}
          </>
        )
      }
    }
  }

  const handleTimeDisplay = (currTime) => {
    const hour = Math.floor(currTime / 3600)
    const min = Math.floor((currTime % 3600) / 60)
    const sec = Math.floor((currTime % 3600) % 60)

    const hourDisplay = hour > 0 ? `${hour}` : ''
    const minDisplay = min > 9 ? `${min}` : `0${min}`
    const secDisplay = sec > 9 ? sec : `0${sec}`

    // console.log('display time')
    // console.log(`${hourDisplay}:${minDisplay}:${secDisplay}`)

    return (
      <>
        {hour ? (
          <>
            <span style={{ width: '30px', textAlign: 'right' }}>
              {hourDisplay}
            </span>
            <span style={{ width: '15px', textAlign: 'right' }}>
              {hour ? ':' : null}
            </span>
          </>
        ) : null}
        <span style={{ width: '50px', textAlign: 'center' }}>{minDisplay}</span>
        <span style={{ width: '15px', textAlign: 'left' }}>:</span>
        <span style={{ width: '50px', textAlign: 'left' }}>{secDisplay}</span>
      </>
    )
  }

  return (
    <ThemeContextConsumer>
      {(theme) => (
        <div className={styles.timerContainer}>
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
                Pomodoro timer is showing how much time left to the end of focus
                or relax break
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
                ref={timerRef}
              ></circle>
            </svg>
            <h1 style={{ color: theme.main }} className={styles.time}>
              {handleTimeDisplay(currentTime.toFixed())}
            </h1>
          </figure>
          <div className={styles.btnContainer}>{handleButtonDisplay()}</div>
        </div>
      )}
    </ThemeContextConsumer>
  )
}

export default React.memo(Timer)

import React, { useRef, useState, useEffect, useContext } from 'react'
import styles from './Timer.module.css'
import { MenuContext } from '../MenuContext/MenuContext'
import TimerButtons from '../TimerButtons/TimerButtons'
import TimerCircle from '../TimerCircle/TimerCircle'
import PomoInfo from '../PomoInfo/PomoInfo'
import PropTypes from 'prop-types'
import FinishModal from '../FinishModal/FinishModal'
import SmallerTimers from '../SmallerTimers/SmallerTimers'

const Timer = ({
  timerState,
  timerRuns,
  timerEnds,
  pomoStart,
  passedPomos,
  handleTimerState,
  handleTimerReset,
  handleTimerRuns,
  handleTimerEnds,
  handlePomoStart,
  handlePassedPomos,
}) => {
  const menuContext = useContext(MenuContext)
  const {
    autoStartPomo,
    autoStartBreak,
    longBreakEvery,
    pomoTime,
    breakTime,
    pomoRingtone,
    breakRingtone,
    longBreakTime,
    soundOn,
    focusGoal,
    handlePlaySound,
  } = menuContext

  const [startingTimerTime, setStartingTimerTime] = useState(pomoTime)
  const [currentTime, setCurrentTime] = useState(startingTimerTime)
  const [fullRunTime, setFullRunTime] = useState(0)
  const [fullProgress, setFullProgress] = useState(0)
  // const [timerRef, setTimerRef] = useState(null)
  // const [smallTimerRef, setSmallTimerRef] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const rAF = useRef()

  useEffect(() => {
    // Setting starting timer time
    if (!pomoStart || timerEnds) {
      setFullRunTime(0)
      if (timerState === 'pomo') {
        settingStartingTime(pomoTime)
      } else if (timerState === 'break' && longBreakEvery / passedPomos === 1) {
        settingStartingTime(longBreakTime)
      } else if (timerState === 'break') {
        settingStartingTime(breakTime)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerEnds, pomoTime, breakTime, longBreakTime, longBreakEvery])

  useEffect(() => {
    // Handling sounds effects
    if (timerEnds && soundOn) {
      if (Math.round(focusGoal / pomoTime) === passedPomos) {
        handlePlaySound('end')
      } else if (timerState === 'pomo' && pomoRingtone) {
        handlePlaySound('pomo')
      } else if (
        timerState === 'break' &&
        longBreakEvery / passedPomos === 1 &&
        breakRingtone
      ) {
        handlePlaySound('long break')
      } else if (timerState === 'break' && breakRingtone) {
        handlePlaySound('break')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerEnds])

  useEffect(() => {
    if (fullRunTime === 0) {
      // Auto starting pomo
      if (pomoStart && timerState === 'pomo' && autoStartPomo && pomoStart) {
        handleTimer()
      }
      // Auto starting break
      if (pomoStart && timerState === 'break' && autoStartBreak) {
        handleTimer()
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullRunTime])

  useEffect(() => {
    // Handling timer stop
    if (timerState === 'pomo' && !autoStartPomo) {
      handleTimerRuns(false)
    }

    // Handling timer stop
    if (timerState === 'break' && !autoStartBreak) {
      handleTimerRuns(false)
    }

    // Handling passed pomos
    if (pomoStart && timerState === 'break') {
      handlePassedPomos()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerState])

  useEffect(() => {
    // Handling focus goal end
    if (Math.round(focusGoal / pomoTime) === passedPomos) {
      handleTimerReset()
      setModalOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedPomos])

  const startTimer = (timestamp, startTime, duration, startRunTime) => {
    let currentRunTime = (timestamp - startTime) / 1000 // conversion to seconds
    let runTime = currentRunTime + startRunTime
    let progress = runTime / duration

    setFullProgress(progress)
    setFullRunTime(runTime)
    setCurrentTime(startingTimerTime - runTime)

    if (runTime < duration) {
      rAF.current = requestAnimationFrame((timestamp) => {
        startTimer(timestamp, startTime, duration, startRunTime)
      })
    } else {
      handleTimerEnding()
    }
  }

  const handleTimer = () => {
    if (!pomoStart) {
      handlePomoStart()
    }
    rAF.current = requestAnimationFrame((timestamp) => {
      handleTimerEnds(false)
      handleTimerRuns(true)

      const startTime = timestamp || performance.now() || Date.now()
      const startRunTime = fullRunTime

      startTimer(timestamp, startTime, startingTimerTime, startRunTime)
    })
  }

  const handleTimerStopOrPlay = () => {
    if (timerRuns) {
      handleTimerRuns(false)
      cancelAnimationFrame(rAF.current)
    } else {
      handleTimer()
    }
  }

  const handleTimerQuit = () => {
    cancelAnimationFrame(rAF.current)
    setFullProgress(0)
    handleTimerReset()
    setStartingTimerTime(pomoTime)
    setCurrentTime(pomoTime)
    setFullRunTime(0)
  }

  const handleTimerEnding = () => {
    cancelAnimationFrame(rAF.current)
    handleTimerState()
    handleTimerEnds(true)
  }

  const settingStartingTime = (time) => {
    setStartingTimerTime(time)
    setCurrentTime(time)
  }

  return (
    <div className={styles.timerContainer}>
      <PomoInfo setModalOpen={setModalOpen} passedPomos={passedPomos} />
      <SmallerTimers
        currentTime={currentTime}
        pomosGoal={Math.round(focusGoal / pomoTime)}
        fullProgress={fullProgress}
        passedPomos={passedPomos}
        timerState={timerState}
      />
      <TimerCircle
        currentTime={currentTime}
        fullProgress={fullProgress}
        isTimeDisplay
      />
      <TimerButtons
        timerState={timerState}
        timerRuns={timerRuns}
        timerEnds={timerEnds}
        pomoStart={pomoStart}
        handleTimer={handleTimer}
        handleTimerStopOrPlay={handleTimerStopOrPlay}
        handleTimerQuit={handleTimerQuit}
      />

      <FinishModal
        passedPomos={passedPomos}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  )
}

Timer.propTypes = {
  timerState: PropTypes.string.isRequired,
  timerRuns: PropTypes.bool.isRequired,
  timerEnds: PropTypes.bool.isRequired,
  pomoStart: PropTypes.bool.isRequired,
  passedPomos: PropTypes.number.isRequired,
  handleTimerState: PropTypes.func.isRequired,
  handleTimerReset: PropTypes.func.isRequired,
  handleTimerRuns: PropTypes.func.isRequired,
  handleTimerEnds: PropTypes.func.isRequired,
  handlePomoStart: PropTypes.func.isRequired,
  handlePassedPomos: PropTypes.func.isRequired,
}

export default React.memo(Timer)

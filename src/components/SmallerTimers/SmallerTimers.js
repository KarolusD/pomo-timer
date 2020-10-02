import React from 'react'
import TimerCircle from '../TimerCircle/TimerCircle'
import styles from './SmallerTimers.module.css'

const SmallerTimers = ({
  setTimerCircleRef,
  currentTime,
  passedPomos,
  pomosGoal,
  fullProgress,
  timerState,
}) => {
  const handleDisplay = () => {
    let timers = []

    console.log(passedPomos)
    for (let i = 0; i < pomosGoal; i++) {
      if (i < 4) {
        if (
          (timerState === 'pomo' && i === passedPomos) ||
          (timerState === 'break' && i + 1 === passedPomos)
        ) {
          // displaying running active timer
          timers.push(
            <TimerCircle
              key={i}
              setTimerCircleRef={setTimerCircleRef}
              currentTime={currentTime}
              fullProgress={fullProgress}
              smallTimer
              passedPomos={passedPomos}
            />
          )
        } else if (i < passedPomos) {
          // displaying filled timers
          timers.push(<TimerCircle key={i} filled smallTimer />)
        } else {
          // displaying rest of small timers
          timers.push(<TimerCircle key={i} smallTimer />)
        }
      } else {
        // displaying special timer if there is more than 4
        if (
          (timerState === 'pomo' && passedPomos >= 4) ||
          (timerState === 'break' && passedPomos >= 5)
        ) {
          console.log('siema, biegam')
          timers.push(
            <TimerCircle
              key={i}
              setTimerCircleRef={setTimerCircleRef}
              currentTime={currentTime}
              smallTimer
              fullProgress={fullProgress}
              pomosGoal={pomosGoal}
              passedPomos={passedPomos}
              ifNumber={pomosGoal > 5 ? true : false}
              number={pomosGoal - passedPomos}
            />
          )
        } else {
          console.log('siema, nie biegam')
          timers.push(
            <TimerCircle
              key={i}
              smallTimer
              pomosGoal={pomosGoal}
              passedPomos={passedPomos}
              ifNumber={pomosGoal > 5 ? true : false}
              number={pomosGoal - 4}
            />
          )
        }
        break
      }
    }
    return timers
  }

  return <div className={styles.container}>{handleDisplay()}</div>
}

export default SmallerTimers

import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import styles from './TimeDisplay.module.css'

const TimeDisplay = ({ currentTime }) => {
  const theme = useContext(ThemeContext)

  const handleTimeDisplay = (currTime) => {
    const hour = Math.floor(currTime / 3600)
    const min = Math.floor((currTime % 3600) / 60)
    const sec = Math.floor((currTime % 3600) % 60)

    const hourDisplay = hour > 0 ? `${hour}` : ''
    const minDisplay = min > 9 ? `${min}` : `0${min}`
    const secDisplay = sec > 9 ? sec : `0${sec}`

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
    <h1 style={{ color: theme.main }} className={styles.time}>
      {handleTimeDisplay(currentTime.toFixed())}
    </h1>
  )
}

export default TimeDisplay

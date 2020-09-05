import React, { useState, useContext, useEffect } from 'react'
import { MenuContext } from '../MenuContext/MenuContext'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import styles from './TimeSettings.module.css'

const TimeSettings = () => {
  const menuContext = useContext(MenuContext)
  const {
    pomoTime,
    breakTime,
    longBreakTime,
    longBreakEvery,
    handlePomoTime,
    handleBreakTime,
    handleLongBreakTime,
    handleLongBreakEvery,
  } = menuContext

  const theme = useContext(ThemeContext)

  const [formData, setFormData] = useState({
    pomoTimeInput: pomoTime / 60,
    breakTimeInput: breakTime / 60,
    longBreakTimeInput: longBreakTime / 60,
    longBreakEveryInput: longBreakEvery,
  })

  const [formStates, setFormStates] = useState({
    pomoTimeInput: 'inactive',
    breakTimeInput: 'inactive',
    longBreakTimeInput: 'inactive',
    longBreakEveryInput: 'inactive',
  })

  useEffect(() => {
    const {
      pomoTimeInput,
      breakTimeInput,
      longBreakTimeInput,
      longBreakEveryInput,
    } = formData

    if (pomoTime !== pomoTimeInput * 60) {
      handlePomoTime(Number(pomoTimeInput) * 60)
    }
    if (breakTime !== breakTimeInput * 60) {
      handleBreakTime(Number(breakTimeInput) * 60)
    }
    if (longBreakTime !== longBreakTimeInput * 60) {
      handleLongBreakTime(Number(longBreakTimeInput) * 60)
    }
    if (longBreakEvery !== longBreakEveryInput) {
      handleLongBreakEvery(Number(longBreakEveryInput))
    }
  }, [
    handlePomoTime,
    handleBreakTime,
    handleLongBreakTime,
    handleLongBreakEvery,
    pomoTime,
    breakTime,
    formData,
    longBreakTime,
    longBreakEvery,
  ])

  const validate = (value, minNum = 0, maxNum = 600) => {
    //const validNumber = /^(0|[1-9]\d*)(\.\d+)?$/
    const validNumber = /^([1-9]\d*)(\.\d+)?$/
    return (
      validNumber.test(value) &&
      Number(value) > minNum &&
      Number(value) < maxNum
    )
  }

  const updateFormData = (
    event,
    validateRules = { minNum: 0, maxNum: 600 }
  ) => {
    const { value, name } = event.target
    const { minNum, maxNum } = validateRules

    if (validate(value, minNum, maxNum)) {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setFormStates({
      ...formStates,
      [name]: 'inactive',
    })
  }

  const handleFocus = (event) => {
    const { name } = event.target
    setFormStates({
      ...formStates,
      [name]: 'focused',
    })
  }

  const spanStyles = (inputState) => {
    if (inputState === 'inactive') {
      return {
        background: theme.whitesmoke,
        color: theme.gray,
      }
    } else {
      return {
        background: theme.main,
        color: theme.white,
      }
    }
  }

  const inputStyles = (inputState) => {
    const bg = theme.whitesnow

    if (inputState === 'inactive') {
      return {
        background: bg,
        border: `1px solid transparent`,
      }
    } else if (inputState === 'focused') {
      return {
        background: bg,
        border: `1px solid ${theme.main}`,
      }
    }
  }

  const {
    pomoTimeInput,
    breakTimeInput,
    longBreakTimeInput,
    longBreakEveryInput,
  } = formData
  const {
    pomoTimeInput: pomoState,
    breakTimeInput: breakState,
    longBreakTimeInput: longBreakState,
    longBreakEveryInput: longBreakEveryState,
  } = formStates

  return (
    <form className={styles.container}>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Pomo time</label>
        <input
          type='number'
          name='pomoTimeInput'
          value={pomoTimeInput}
          onChange={(e) => updateFormData(e)}
          className={styles.input}
          style={inputStyles(pomoState)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span style={spanStyles(pomoState)} className={styles.inputValue}>
          min
        </span>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Break time</label>
        <input
          type='number'
          name='breakTimeInput'
          value={breakTimeInput}
          onChange={(e) => updateFormData(e)}
          className={styles.input}
          style={inputStyles(breakState)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span style={spanStyles(breakState)} className={styles.inputValue}>
          min
        </span>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Long break time</label>
        <input
          type='number'
          name='longBreakTimeInput'
          value={longBreakTimeInput}
          onChange={(e) => updateFormData(e)}
          className={styles.input}
          style={inputStyles(longBreakState)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span style={spanStyles(longBreakState)} className={styles.inputValue}>
          min
        </span>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Long break every</label>
        <input
          type='number'
          name='longBreakEveryInput'
          value={longBreakEveryInput}
          onChange={(e) => updateFormData(e, { minNum: 1, maxNum: 11 })}
          className={styles.input}
          style={inputStyles(longBreakEveryState)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span
          style={spanStyles(longBreakEveryState)}
          className={styles.inputValue}
        >
          pomo
        </span>
      </div>
    </form>
  )
}

export default React.memo(TimeSettings)

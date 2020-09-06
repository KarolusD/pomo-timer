import React, { useState, useContext, useEffect } from 'react'
import Input from '../Input/Input'
import { MenuContext } from '../MenuContext/MenuContext'
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

  const [formData, setFormData] = useState({
    pomoTimeInput: (pomoTime / 60).toString(),
    breakTimeInput: (breakTime / 60).toString(),
    longBreakTimeInput: (longBreakTime / 60).toString(),
    longBreakEveryInput: longBreakEvery.toString(),
  })

  useEffect(() => {
    const {
      pomoTimeInput,
      breakTimeInput,
      longBreakTimeInput,
      longBreakEveryInput,
    } = formData

    const SEC_IN_MIN = 60

    if (pomoTime !== pomoTimeInput * SEC_IN_MIN) {
      handlePomoTime(Number(pomoTimeInput) * SEC_IN_MIN)
    }
    if (breakTime !== breakTimeInput * SEC_IN_MIN) {
      handleBreakTime(Number(breakTimeInput) * SEC_IN_MIN)
    }
    if (longBreakTime !== longBreakTimeInput * SEC_IN_MIN) {
      handleLongBreakTime(Number(longBreakTimeInput) * SEC_IN_MIN)
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
    const validNumber = /^(0|[1-9]\d*)(\.\d+)?$/

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
    console.log(value, typeof value)
    const { minNum, maxNum } = validateRules

    if (validate(value, minNum, maxNum)) {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const {
    pomoTimeInput,
    breakTimeInput,
    longBreakTimeInput,
    longBreakEveryInput,
  } = formData

  return (
    <form className={styles.container}>
      <Input
        label='Pomo time'
        type='number'
        name='pomoTimeInput'
        value={pomoTimeInput}
        onChange={updateFormData}
        span='min'
      />

      <Input
        label='Break time'
        type='number'
        name='breakTimeInput'
        value={breakTimeInput}
        onChange={updateFormData}
        span='min'
      />

      <Input
        label='Long break time'
        type='number'
        name='longBreakTimeInput'
        value={longBreakTimeInput}
        onChange={updateFormData}
        span='min'
      />

      <Input
        label='Long break every'
        type='number'
        name='longBreakEveryInput'
        value={longBreakEveryInput}
        onChange={updateFormData}
        span='pomo'
      />
    </form>
  )
}

export default React.memo(TimeSettings)

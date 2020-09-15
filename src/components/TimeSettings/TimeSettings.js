import React, { useState, useContext, useEffect } from 'react'
import Input from '../Input/Input'
import { MenuContext } from '../MenuContext/MenuContext'
import styles from './TimeSettings.module.css'
import { validateNumberInput } from '../../helpers/validateNumberInput'

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

  const SEC_IN_MIN = 60

  const [formData, setFormData] = useState({
    pomoTimeInput: (pomoTime / SEC_IN_MIN).toString(),
    breakTimeInput: (breakTime / SEC_IN_MIN).toString(),
    longBreakTimeInput: (longBreakTime / SEC_IN_MIN).toString(),
    longBreakEveryInput: longBreakEvery.toString(),
  })

  const {
    pomoTimeInput,
    breakTimeInput,
    longBreakTimeInput,
    longBreakEveryInput,
  } = formData

  useEffect(() => {
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
    longBreakTime,
    longBreakEvery,
    pomoTimeInput,
    breakTimeInput,
    longBreakTimeInput,
    longBreakEveryInput,
  ])

  const updateFormData = (
    event,
    validateRules = { minNum: 0, maxNum: 600 }
  ) => {
    event.preventDefault()
    const { value, name } = event.target
    const { minNum, maxNum } = validateRules

    if (validateNumberInput(value, minNum, maxNum)) {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

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

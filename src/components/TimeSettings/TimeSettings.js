import React, { useState, useContext, useEffect } from 'react'
import Input from '../Input/Input'
import { MenuContext } from '../MenuContext/MenuContext'
import styles from './TimeSettings.module.css'
import { validateNumberInput } from '../../helpers/validateNumberInput'

const TimeSettings = () => {
  const menuContext = useContext(MenuContext)

  const validateFormRules = { minNum: 0, maxNum: 600 }
  const { minNum, maxNum } = validateFormRules

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

  const [formErrors, setFormErrors] = useState({
    pomoTimeInput: false,
    breakTimeInput: false,
    longBreakTimeInput: false,
    longBreakEveryInput: false,
  })

  // TODO: make a custom hook for handling form inputs because this code looks like a peace of shit

  //

  useEffect(() => {
    if (Number(pomoTimeInput) > maxNum) {
      handlePomoTime(maxNum * SEC_IN_MIN)
    } else if (Number(pomoTimeInput) < minNum) {
      handlePomoTime(minNum * SEC_IN_MIN)
    } else if (Number(pomoTimeInput)) {
      handlePomoTime(Number(pomoTimeInput) * SEC_IN_MIN)
    } else {
      handlePomoTime(SEC_IN_MIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pomoTimeInput])

  useEffect(() => {
    if (Number(breakTimeInput) > maxNum) {
      handleBreakTime(maxNum * SEC_IN_MIN)
    } else if (Number(breakTimeInput) < minNum) {
      handleBreakTime(minNum * SEC_IN_MIN)
    } else if (Number(breakTimeInput)) {
      handleBreakTime(Number(breakTimeInput) * SEC_IN_MIN)
    } else {
      handleBreakTime(SEC_IN_MIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakTimeInput])

  useEffect(() => {
    if (Number(longBreakTimeInput) > maxNum) {
      handleLongBreakTime(maxNum * SEC_IN_MIN)
    } else if (Number(longBreakTimeInput) < minNum) {
      handleLongBreakTime(minNum * SEC_IN_MIN)
    } else if (Number(longBreakTimeInput)) {
      handleLongBreakTime(Number(longBreakTimeInput) * SEC_IN_MIN)
    } else {
      handleLongBreakTime(SEC_IN_MIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longBreakTimeInput])

  useEffect(() => {
    if (Number(longBreakEveryInput) > maxNum) {
      handleLongBreakEvery(maxNum)
    } else if (Number(longBreakEveryInput) < minNum) {
      handleLongBreakEvery(minNum)
    } else if (Number(longBreakEveryInput)) {
      handleLongBreakEvery(Number(longBreakEveryInput))
    } else {
      handleLongBreakEvery(1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [longBreakEveryInput])

  const updateFormData = (event) => {
    event.preventDefault()
    const { value, name } = event.target

    if (validateNumberInput(value, minNum, maxNum)) {
      setFormData({
        ...formData,
        [name]: value,
      })

      setFormErrors({
        ...formErrors,
        [name]: false,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })

      setFormErrors({
        ...formErrors,
        [name]: true,
      })
    }
  }

  return (
    <form noValidate className={styles.container}>
      <Input
        label='Pomo time'
        type='number'
        name='pomoTimeInput'
        value={pomoTimeInput}
        onChange={updateFormData}
        span='min'
        error={formErrors.pomoTimeInput}
        errorMessage={`provide correct number in range from ${minNum} to ${maxNum}`}
      />

      <Input
        label='Break time'
        type='number'
        name='breakTimeInput'
        value={breakTimeInput}
        onChange={updateFormData}
        span='min'
        error={formErrors.breakTimeInput}
        errorMessage={`provide correct number in range from ${minNum} to ${maxNum}`}
      />

      <Input
        label='Long break time'
        type='number'
        name='longBreakTimeInput'
        value={longBreakTimeInput}
        onChange={updateFormData}
        span='min'
        error={formErrors.longBreakTimeInput}
        errorMessage={`provide correct number in range from ${minNum} to ${maxNum}`}
      />

      <Input
        label='Long break every'
        type='number'
        name='longBreakEveryInput'
        value={longBreakEveryInput}
        onChange={updateFormData}
        span='pomo'
        error={formErrors.longBreakEveryInput}
        errorMessage={`provide correct number in range from ${minNum} to ${maxNum}`}
      />
    </form>
  )
}

export default React.memo(TimeSettings)

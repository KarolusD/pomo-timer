import React, { useState, useContext, useEffect } from 'react'
import Input from '../Input/Input'
import styles from './FocusGoalSettings.module.css'
import { MenuContext } from '../MenuContext/MenuContext'
import { validateNumberInput } from '../../helpers/validateNumberInput'

const FocusGoalSettings = () => {
  const menuContext = useContext(MenuContext)
  const { focusGoal, handleFocusGoal, pomoTime } = menuContext

  const [formData, setFormData] = useState({
    focusGoalInput: (focusGoal / 60).toString(),
  })

  const { focusGoalInput } = formData

  useEffect(() => {
    handleFocusGoal(Number(focusGoalInput) * 60)
  }, [focusGoalInput, handleFocusGoal])

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

  const howManyPomosIsYourGoal = () => {
    return Math.round(focusGoal / pomoTime)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
      className={styles.container}
    >
      <Input
        label='Focus goal'
        type='number'
        name='focusGoalInput'
        value={focusGoalInput}
        onChange={updateFormData}
        span='min'
      />
      <p className={styles.focusInfo}>
        You should do at least {howManyPomosIsYourGoal()} pomos
      </p>
    </form>
  )
}

export default FocusGoalSettings

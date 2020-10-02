import React, { useState, useContext, useEffect } from 'react'
import Input from '../Input/Input'
import Icon from '../Icon/Icon'
import styles from './FocusGoalSettings.module.css'
import info from '../../assets/icons/info.svg'
import { MenuContext } from '../MenuContext/MenuContext'
import { validateNumberInput } from '../../helpers/validateNumberInput'
import { ThemeContext } from '../ThemeContext/ThemeContext'

const FocusGoalSettings = () => {
  const menuContext = useContext(MenuContext)
  const theme = useContext(ThemeContext)

  const { focusGoal, handleFocusGoal, pomoTime } = menuContext
  const SEC_IN_MIN = 60
  const validateFormRules = { minNum: 0, maxNum: 600 }
  const { minNum, maxNum } = validateFormRules

  const [formData, setFormData] = useState({
    focusGoalInput: (focusGoal / SEC_IN_MIN).toString(),
  })

  const [formErrors, setFormErrors] = useState({
    focusGoalInput: false,
  })

  const { focusGoalInput } = formData

  useEffect(() => {
    if (Number(focusGoalInput) > maxNum) {
      handleFocusGoal(maxNum * SEC_IN_MIN)
    } else if (Number(focusGoalInput) < minNum) {
      handleFocusGoal(minNum * SEC_IN_MIN)
    } else if (Number(focusGoalInput)) {
      handleFocusGoal(Number(focusGoalInput) * SEC_IN_MIN)
    } else {
      handleFocusGoal(SEC_IN_MIN)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusGoalInput])

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
        error={formErrors.focusGoalInput}
        errorMessage={`Provide correct number in range from ${minNum} to ${maxNum}`}
      />
      <div style={{ background: theme.lightInfo }} className={styles.focusInfo}>
        <Icon src={info} fill={theme.info} />
        <p style={{ color: theme.info }} className={styles.focusInfoText}>
          You should do at least {howManyPomosIsYourGoal()} pomos
        </p>
      </div>
    </form>
  )
}

export default FocusGoalSettings

import React, { useContext, useEffect, useState } from 'react'
import { MenuContext } from '../MenuContext/MenuContext'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import styles from './PomoInfo.module.css'

const PomoInfo = ({ passedPomos }) => {
  const theme = useContext(ThemeContext)
  const menuContext = useContext(MenuContext)
  const { focusGoal, pomoTime } = menuContext

  const [focusGoalInPomos, setFocusGoalInPomos] = useState(
    Math.round(focusGoal / pomoTime)
  )

  useEffect(() => {
    console.log('hej how you doin')
    const goalInPomos = Math.round(focusGoal / pomoTime)
    setFocusGoalInPomos(goalInPomos)
  }, [focusGoal, pomoTime])

  return (
    <p className={styles.info} style={{ color: theme.midMain }}>
      Today goal: {focusGoalInPomos} pomos · {focusGoalInPomos - passedPomos}{' '}
      left
      {}
    </p>
  )
}

export default PomoInfo

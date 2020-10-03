import React, { useContext, useEffect, useState } from 'react'
import { MenuContext } from '../MenuContext/MenuContext'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import styles from './PomoInfo.module.css'

const PomoInfo = ({ passedPomos, setModalOpen }) => {
  const { theme } = useContext(ThemeContext)
  const menuContext = useContext(MenuContext)
  const { focusGoal, pomoTime } = menuContext

  const [focusGoalInPomos, setFocusGoalInPomos] = useState(
    Math.round(focusGoal / pomoTime)
  )

  useEffect(() => {
    const goalInPomos = Math.round(focusGoal / pomoTime)
    setFocusGoalInPomos(goalInPomos)
  }, [focusGoal, pomoTime])

  const handleDisplay = () => {
    if (focusGoalInPomos - passedPomos >= 0) {
      return (
        <p className={styles.info} style={{ color: theme.gray }}>
          Today goal: {focusGoalInPomos} pomos{' '}
          {passedPomos > 0 && `· ${passedPomos} already done`}
        </p>
      )
    } else {
      return (
        <p className={styles.info} style={{ color: theme.gray }}>
          Today goal: {focusGoalInPomos} pomos
          <button
            onClick={() => setModalOpen(true)}
            className={styles.more}
            style={{ background: theme.white, color: theme.main }}
          >
            + {Math.abs(focusGoalInPomos - passedPomos)} more
          </button>
        </p>
      )
    }
  }

  return handleDisplay()
}

export default PomoInfo

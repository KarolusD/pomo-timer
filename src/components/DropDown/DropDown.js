import React, { useState, useContext } from 'react'
import styles from './DropDown.module.css'
import arrowBack from '../../assets/icons/arrow-back.svg'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import { CSSTransition } from 'react-transition-group'
import DropDownItem from '../DropDownItem/DropDownItem'
import timer from '../../assets/icons/timer.svg'
import target from '../../assets/icons/target.svg'
import { MenuContext } from '../MenuContext/MenuContext'
import TimeSettings from '../TimeSettings/TimeSettings'
import FocusGoalSettings from '../FocusGoalSettings/FocusGoalSettings'

const DropDown = () => {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)

  const {
    autoStartPomo,
    autoStartBreak,
    pomoRingtone,
    breakRingtone,
    pomoTime,
    focusGoal,
    handlePomoRingtone,
    handleBreakRingtone,
    handleAutoStartPomo,
    handleAutoStartBreak,
  } = useContext(MenuContext)

  const calcHeight = (el) => {
    const height = el.offsetHeight + 16 // heigh + extra bottom-padding
    setMenuHeight(height)
  }

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div
          className={styles.dropDown}
          style={{
            background: theme.white,
            height: menuHeight == null ? '400px' : menuHeight,
          }}
        >
          <CSSTransition
            in={activeMenu === 'main'}
            unmountOnExit
            timeout={500}
            classNames='menu-primary'
            onEnter={calcHeight}
          >
            <div className='menu'>
              <DropDownItem
                setActiveMenu={setActiveMenu}
                goToMenu='goal'
                leftIcon={target}
                clickable
                currentState={focusGoal}
              >
                Daily focus goal
              </DropDownItem>

              <DropDownItem
                setActiveMenu={setActiveMenu}
                goToMenu='settings'
                leftIcon={timer}
                clickable
                currentState={pomoTime}
              >
                Set pomo time
              </DropDownItem>
              <DropDownItem
                toggle
                toggleState={autoStartPomo}
                handleToggleState={handleAutoStartPomo}
              >
                Auto start of next pomo
              </DropDownItem>
              <DropDownItem
                toggle
                toggleState={autoStartBreak}
                handleToggleState={handleAutoStartBreak}
              >
                Auto start of break
              </DropDownItem>
              <DropDownItem
                toggle
                toggleState={pomoRingtone}
                handleToggleState={handlePomoRingtone}
              >
                Pomo ringtone
              </DropDownItem>
              <DropDownItem
                toggle
                toggleState={breakRingtone}
                handleToggleState={handleBreakRingtone}
              >
                Break ringtone
              </DropDownItem>
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === 'settings'}
            unmountOnExit
            timeout={500}
            classNames='menu-secondary'
            onEnter={calcHeight}
          >
            <div className='menu'>
              <DropDownItem
                title
                setActiveMenu={setActiveMenu}
                leftIcon={arrowBack}
                goToMenu='main'
              >
                Set pomo time
              </DropDownItem>
              <TimeSettings />
            </div>
          </CSSTransition>

          <CSSTransition
            in={activeMenu === 'goal'}
            unmountOnExit
            timeout={500}
            classNames='menu-secondary'
            onEnter={calcHeight}
          >
            <div className='menu'>
              <DropDownItem
                title
                setActiveMenu={setActiveMenu}
                leftIcon={arrowBack}
                goToMenu='main'
              >
                Daily focus goal
              </DropDownItem>
              <FocusGoalSettings />
            </div>
          </CSSTransition>
        </div>
      )}
    </ThemeContext.Consumer>
  )
}

export default React.memo(DropDown)

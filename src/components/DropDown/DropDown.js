import React, { useState, useContext } from 'react'
import styles from './DropDown.module.css'
import arrowBack from '../../assets/icons/arrow-back.svg'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'
import { CSSTransition } from 'react-transition-group'
import DropDownItem from '../DropDownItem/DropDownItem'
import timer from '../../assets/icons/timer.svg'
import target from '../../assets/icons/target.svg'
import { MenuContext } from '../MenuContext/MenuContext'
import TimeSettings from '../TimeSettings/TimeSettings'

const DropDown = () => {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)

  const menuContext = useContext(MenuContext)

  const calcHeight = (el) => {
    const height = el.offsetHeight + 16 // heigh + extra bottom-padding
    setMenuHeight(height)
  }

  return (
    <ThemeContextConsumer>
      {(theme) => (
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
              <DropDownItem leftIcon={target} clickable>
                Daily focus goal
              </DropDownItem>
              <DropDownItem
                setActiveMenu={setActiveMenu}
                goToMenu='settings'
                leftIcon={timer}
                clickable
              >
                Set pomo time
              </DropDownItem>
              <DropDownItem
                toggle
                toggleState={menuContext.autoStartPomo}
                handleToggleState={menuContext.handleAutoStartPomo}
              >
                Auto start of next pomo
              </DropDownItem>
              <DropDownItem
                toggle
                toggleState={menuContext.autoStartBreak}
                handleToggleState={menuContext.handleAutoStartBreak}
              >
                Auto start of break
              </DropDownItem>
              <DropDownItem toggle>Pomo ringtone</DropDownItem>
              <DropDownItem toggle>Break ringtone</DropDownItem>
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
        </div>
      )}
    </ThemeContextConsumer>
  )
}

export default React.memo(DropDown)

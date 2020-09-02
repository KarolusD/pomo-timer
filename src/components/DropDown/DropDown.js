import React, { useState } from 'react'
import styles from './DropDown.module.css'
import arrowBack from '../../assets/icons/arrow-back.svg'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'
import { CSSTransition } from 'react-transition-group'
import DropDownItem from '../DropDownItem/DropDownItem'
import timer from '../../assets/icons/timer.svg'
import target from '../../assets/icons/target.svg'

const DropDown = () => {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null)

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
              <DropDownItem toggle>Auto start of next pomo</DropDownItem>
              <DropDownItem toggle>Auto start of break</DropDownItem>
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
              <DropDownItem>Settings 1</DropDownItem>
              <DropDownItem>Settings 2</DropDownItem>
              <DropDownItem>Settings 2</DropDownItem>
              <DropDownItem>Settings 2</DropDownItem>
            </div>
          </CSSTransition>
        </div>
      )}
    </ThemeContextConsumer>
  )
}

export default DropDown

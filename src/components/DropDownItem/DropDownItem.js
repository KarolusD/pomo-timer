import React, { useContext } from 'react'
import Icon from '../Icon/Icon'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import styles from './DropDownItem.module.css'
import ToggleButton from '../ToggleButton/ToggleButton'

const DropDownItem = ({
  clickable,
  leftIcon,
  children,
  goToMenu,
  setActiveMenu,
  title,
  toggle,
  toggleState,
  handleToggleState,
  currentState,
}) => {
  const theme = useContext(ThemeContext)

  const handleClick = (event) => {
    event.preventDefault()
    if (goToMenu) {
      setActiveMenu(goToMenu)
    }
  }

  const handleDisplay = () => {
    if (title) {
      return (
        <div className={styles.menuTitleContainer}>
          <a
            href='_target'
            onClick={handleClick}
            className={styles.menuTitleIcon}
          >
            {leftIcon && (
              <div className={styles.menuTitleIcon}>
                <Icon src={leftIcon} fill={theme.main} />
              </div>
            )}
          </a>
          <h2 style={{ color: theme.black }} className={styles.menuTitle}>
            {children}
          </h2>
        </div>
      )
    } else {
      return (
        <a
          href='_target'
          style={{
            color: theme.gray,
            cursor: clickable ? 'pointer' : 'default',
            justifyContent: toggle ? 'space-between' : 'flex-start',
          }}
          className={styles.dropDownItem}
          onClick={handleClick}
        >
          {leftIcon && (
            <div className={`${styles.dropDownIcon} ${styles.leftIcon}`}>
              <Icon src={leftIcon} fill={theme.lightGray} />
            </div>
          )}
          {children}
          {toggle && (
            <ToggleButton
              toggleState={toggleState}
              handleToggleState={handleToggleState}
            />
          )}
          {currentState && (
            <p style={{ marginLeft: 'auto', color: theme.midMain }}>
              {(currentState / 60).toFixed(2)} min
            </p>
          )}
        </a>
      )
    }
  }

  return handleDisplay()
}

export default DropDownItem

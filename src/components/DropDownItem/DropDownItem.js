import React from 'react'
import Icon from '../Icon/Icon'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'
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
}) => {
  const handleClick = (event) => {
    event.preventDefault()
    if (goToMenu) {
      setActiveMenu(goToMenu)
    }
  }

  return (
    <ThemeContextConsumer>
      {(theme) =>
        title ? (
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
        ) : (
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
          </a>
        )
      }
    </ThemeContextConsumer>
  )
}

export default DropDownItem

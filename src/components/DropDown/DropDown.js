import React from 'react'
import Icon from '../Icon/Icon'
import styles from './DropDown.module.css'
import {
  ThemeContextProvider,
  ThemeContextConsumer,
} from '../ThemeContext/ThemeContext'

const DropDownItem = ({ leftIcon, rightIcon, children }) => {
  return (
    <a href='_target' className={styles.dropDownItem}>
      {leftIcon ? (
        <div className={`${styles.dropDownIcon} ${styles.leftIcon}`}>
          <Icon src={leftIcon} />
        </div>
      ) : null}
      {children}
      {rightIcon ? (
        <div className={`${styles.dropDownIcon} ${styles.rightIcon}`}>
          <Icon src={rightIcon} />
        </div>
      ) : null}
    </a>
  )
}

const DropDown = () => {
  return (
    <ThemeContextConsumer>
      {(theme) => (
        <div style={{ background: theme.white }} className={styles.dropDown}>
          <DropDownItem>Something</DropDownItem>
          <DropDownItem>Something 2</DropDownItem>
          <DropDownItem>Something 3</DropDownItem>
        </div>
      )}
    </ThemeContextConsumer>
  )
}

export default DropDown

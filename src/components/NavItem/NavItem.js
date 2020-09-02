import React, { useState } from 'react'
import Icon from '../Icon/Icon'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'
import styles from './NavItem.module.css'

const NavItem = ({ icon, secondaryIcon, changeable, children }) => {
  const [open, setOpen] = useState(false)

  const handleClick = (event) => {
    event.preventDefault()
    setOpen(!open)
  }

  return (
    <ThemeContextConsumer>
      {(theme) => (
        <li className={styles.navItem} style={{ backgroundColor: theme.white }}>
          <a href='_target' onClick={handleClick}>
            <Icon
              src={changeable && open ? secondaryIcon : icon}
              fill={theme.main}
            />
          </a>

          {open && children}
        </li>
      )}
    </ThemeContextConsumer>
  )
}

export default NavItem

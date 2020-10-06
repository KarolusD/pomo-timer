import React, { useState, useContext } from 'react'
import Icon from '../Icon/Icon'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import { MenuContext } from '../MenuContext/MenuContext'
import styles from './NavItem.module.css'

const NavItem = ({
  icon,
  secondaryIcon,
  changeable,
  sound,
  children,
  ariaLabel,
}) => {
  const [open, setOpen] = useState(false)

  const { theme } = useContext(ThemeContext)
  const { soundOn, handleSoundOn } = useContext(MenuContext)

  const handleClick = (event) => {
    event.preventDefault()
    setOpen(!open)
    if (sound) {
      handleSoundOn()
    }
  }

  const handleIconDisplay = () => {
    if (sound) {
      return changeable && soundOn ? secondaryIcon : icon
    } else {
      return changeable && open ? secondaryIcon : icon
    }
  }

  return (
    <li className={styles.navItem} style={{ backgroundColor: theme.white }}>
      <a href='_target' onClick={handleClick} aria-label={ariaLabel}>
        <Icon src={handleIconDisplay()} fill={theme.main} />
      </a>

      {open && children}
    </li>
  )
}

export default React.memo(NavItem)

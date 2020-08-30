import React from 'react'
import styles from './NavBar.module.css'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'

const NavBar = ({ children }) => {
  return (
    <ThemeContextConsumer>
      {(theme) => (
        <nav className={styles.navBar}>
          <ul className={styles.navList}>{children}</ul>
        </nav>
      )}
    </ThemeContextConsumer>
  )
}

export default NavBar

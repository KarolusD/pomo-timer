import React from 'react'
import styles from './NavBar.module.css'

const NavBar = ({ children }) => {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>{children}</ul>
    </nav>
  )
}

export default React.memo(NavBar)

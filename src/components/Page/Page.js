import React from 'react'
import styles from './Page.module.css'
import { ThemeContext } from '../ThemeContext/ThemeContext'

const Page = (props) => {
  const { children } = props
  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <section
          className={styles.page}
          style={{ background: theme.background }}
        >
          {children}
        </section>
      )}
    </ThemeContext.Consumer>
  )
}

export default Page

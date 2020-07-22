import React from 'react'
import styles from './Page.module.css'
import { ThemeContextConsumer } from '../ThemeContext/ThemeContext'

const Page = (props) => {
  const { children } = props
  return (
    <ThemeContextConsumer>
      {(theme) => (
        <section
          className={styles.page}
          style={{ background: theme.background }}
        >
          {children}
        </section>
      )}
    </ThemeContextConsumer>
  )
}

export default Page

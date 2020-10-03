import React from 'react'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.yellow}></div>
      <div className={styles.red}></div>
      <div className={styles.blue}></div>
      <div className={styles.violet}></div>
    </div>
  )
}

export default Loader

import React from 'react'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.circle1}></span>
      <span className={styles.circle2}></span>
      <span className={styles.circle3}></span>
      <span className={styles.circle4}></span>
      <span className={styles.circle5}></span>
      <span className={styles.circle6}></span>
      <span className={styles.circle7}></span>
      <span className={styles.circle8}></span>
    </div>
  )
}

export default Loader

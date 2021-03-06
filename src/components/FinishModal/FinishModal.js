import React, { useContext } from 'react'
import { ThemeContext } from '../ThemeContext/ThemeContext'
import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import close from '../../assets/icons/close.svg'
import { ReactComponent as BegginerBadge } from '../../assets/icons/begginer-badge.svg'
import styles from './FinishModal.module.css'

const FinishModal = ({ passedPomos, modalOpen, setModalOpen }) => {
  // TODO: Display rank badges based on passedPomos (later on more complicated connections, like minimum pomoTime, max breakTime, etc.)
  // TODO: Add button for sharing results (generate a sharing link)
  // TODO: Generate sharing link with social media preview
  const { theme } = useContext(ThemeContext)

  return modalOpen ? (
    <div className={styles.container}>
      <div style={{ background: theme.white }} className={styles.popup}>
        <h1 className={styles.title}>Congratulations!</h1>
        <p className={styles.subtitle}>
          You achive your daily focus goal, you focused for {passedPomos} pomos.
        </p>
        <p className={styles.rank}>You win a level badge!</p>
        <BegginerBadge style={{ maxWidth: '300px' }} />

        <Button
          handleClick={() => setModalOpen(false)}
          primary
          label='continue'
        />
        <button className={styles.close} onClick={() => setModalOpen(false)}>
          <Icon src={close} fill={theme.gray} />
        </button>
      </div>
    </div>
  ) : null
}

export default FinishModal

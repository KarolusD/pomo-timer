import React from 'react'
import PropTypes from 'prop-types'
import styles from './Icon.module.css'
import { ReactSVG } from 'react-svg'

const Icon = ({ src, fill }) => (
  <ReactSVG
    src={src}
    beforeInjection={(svg) => {
      svg.setAttribute('fill', `${fill}`)
    }}
    wrapper='div'
    className={styles.iconWrapper}
  />
)

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  fill: PropTypes.string,
}

export default React.memo(Icon)

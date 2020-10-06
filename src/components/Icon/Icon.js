import React from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-inlinesvg'

const Icon = ({ src, fill }) => {
  return <SVG src={src} fill={fill} />
}

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  fill: PropTypes.string,
}

export default Icon

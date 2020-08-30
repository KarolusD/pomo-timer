import React from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-inlinesvg'

const Icon = ({ src, fill }) => (
  <>
    <SVG
      src={src}
      preProcessor={(code) => code.replace(/fill=".*?"/g, `fill=${fill} `)}
    />
  </>
)

Icon.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Icon

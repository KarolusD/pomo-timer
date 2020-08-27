import React from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-inlinesvg'

const Icon = ({ src, fill, ...props }) => (
  <div {...props}>
    <SVG
      src={src}
      preProcessor={(code) => code.replace(/fill=".*?"/g, `fill=${fill}`)}
    />
  </div>
)

Icon.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Icon

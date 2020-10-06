import React from 'react'
import PropTypes from 'prop-types'
import SVG from 'react-inlinesvg'

const Icon = ({ src, fill }) => (
  <SVG
    src={src}
    cacheRequests={true}
    preProcessor={(code) => {
      if (fill) {
        return code.replace(/fill=".*?"/g, `fill="${fill}"`)
      } else {
        return code
      }
    }}
  />
)

Icon.propTypes = {
  src: PropTypes.string.isRequired,
  fill: PropTypes.string,
}

export default React.memo(Icon)

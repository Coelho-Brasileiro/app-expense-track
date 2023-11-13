import React from 'react'
import PropTypes from 'prop-types'

const ColoredSquare = ({ color }) => {
  const squareStyle = {
    width: '25px',
    height: '25px',
    backgroundColor: color,
    borderRadius: '10px',
  }

  return <div style={squareStyle}></div>
}
ColoredSquare.propTypes = {
  color: PropTypes.string,
}
export default ColoredSquare

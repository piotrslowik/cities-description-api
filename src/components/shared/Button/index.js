import React from "react";
import PropTypes from 'prop-types';

const button = ({
  text,
  action,
  className,
}) => {
  return (
    <button
      onClick = { action }
      className = { `button ${className}` }
    >
      { text }
    </button>
  )
}

button.propTypes = {
  text: PropTypes.string,
  action: PropTypes.func,
  className: PropTypes.string,
}

button.defaultValues = {
  text: '',
  action: () => {},
  className: '',
}

export default button;
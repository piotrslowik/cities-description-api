import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss'

const input = ({
  className,
  id,
  value,
  actionOnChange,
  type,
  placeholder,
  autoComplete
}) => {
  return (
    <input
      className={`input ${className}`}
      id={id}
      value={value}
      onChange={el => actionOnChange(el.target.value)}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
    />
  )
};

input.propTypes = {
  id: PropTypes.string,
  class: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  actionOnChange: PropTypes.func,
  type: PropTypes.string,
  autoComplete: PropTypes.oneOf(["on", "off"])
};

input.defaultProps = {
  id: '',
  class: '',
  placeholder: '',
  value: '',
  actionOnChange: () => { },
  type: 'text',
  autoComplete: 'off'
}

export default input;
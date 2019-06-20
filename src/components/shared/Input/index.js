import React from 'react';
import PropTypes from 'prop-types';

const input = ({
  className,
  id,
  value,
  actionOnChange,
  actionOnKeyPress,
  type,
  placeholder,
  actionOnBlur,
  actionOnFocus,
  arrowEvents,
}) => {
  return (
    <input
      className={`input ${className}`}
      id={id}
      value={value}
      onChange={el => actionOnChange(el.target.value)}
      onKeyPress={actionOnKeyPress}
      type={type}
      placeholder={placeholder}
      onBlur={actionOnBlur}
      onFocus={actionOnFocus}
      {...arrowEvents}
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
};

input.defaultProps = {
  id: '',
  class: '',
  placeholder: '',
  value: '',
  actionOnChange: () => { },
  type: 'text',
}

export default input;
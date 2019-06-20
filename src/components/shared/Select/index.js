import React from 'react';
import PropTypes from 'prop-types';

const select = ({
  options,
  actionOnChange,
  label,
}) => {
  const renderOptions = () => {
    return (
      options.map((el, index) => {
        return <option value={el.value} key={index}>{el.text}</option>
      })
    )
  }
  return (
    <div className="select-wrapper">
      <p className="select-label">{ label }</p>
      <select
        className="select"
        onChange={actionOnChange}
      >
        { renderOptions() }
      </select>
    </div>
  )
}

select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      text: PropTypes.string,
    })),
  actionOnChange: PropTypes.func,
  label: PropTypes.string,
}

select.defaultProps = {
  options: [],
  actionOnChange: () => {},
  label: '',
}

export default select;
import React from 'react';
import PropTypes from 'prop-types';

const input = ({
  text,
  actionOnClick,
  active
}) => {
  return (
    <div
      className={`suggestion ${active ? 'suggestion--active' : ''}`}
      onClick={el => actionOnClick(text)}
    >
      { text }
    </div>
  )
};

input.propTypes = {
  text: PropTypes.string.isRequired,
  actionOnClick: PropTypes.func,
};

input.defaultProps = {
  actionOnClick: () => { },
}

export default input;
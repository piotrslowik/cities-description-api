import React from 'react';
import PropTypes from 'prop-types';

const suggestion = ({
  text,
  actionOnClick,
  active
}) => {
  return (
    <div
      className={`suggestion ${active ? 'suggestion--active' : ''}`}
      onClick={() => actionOnClick(text)}
    >
      { text }
    </div>
  )
};

suggestion.propTypes = {
  text: PropTypes.string.isRequired,
  actionOnClick: PropTypes.func,
};

suggestion.defaultProps = {
  actionOnClick: () => { },
}

export default suggestion;
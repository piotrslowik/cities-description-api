import React from 'react';
import PropTypes from 'prop-types';

const header = ({
  main,
  sub
}) => {
  return (
    <div className="header">
      <h1>{ main }</h1>
      <h2>{ sub }</h2>
    </div>
  )
}

header.propTypes = {
  main: PropTypes.string,
  sub: PropTypes.string,
}

header.defaultProps = {
  main: '',
  sub: '',
}

export default header;
import React from 'react';
import PropTypes from 'prop-types';

const accordion = ({
  header,
  text
}) => {

  const toggle = e => {
    e.target.parentNode.classList.toggle('accordion--active');
    const textBlock = e.target.nextElementSibling;
    textBlock.style.maxHeight = textBlock.style.maxHeight ? null : textBlock.scrollHeight + 'px';
  }

  return (
    <div className="accordion">
      <button className="accordion__header" onClick={toggle}>{ header }</button>
      <div className="accordion__text">
        <p>{ text }</p>
      </div>
    </div>
  )
}

accordion.propTypes = {
  header: PropTypes.string,
  text: PropTypes.string,
}

accordion.defaultProps = {
  header: '',
  text: '',
}

export default accordion;
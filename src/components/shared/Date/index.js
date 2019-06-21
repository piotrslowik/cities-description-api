import React from 'react';
import Input from '../Input';

const date = ({
  value,
  actionOnChange,
  label
  }) => {

  return (
    <div className="date-container">
      <div className="date">
        <p className="date__label"> {label} </p>
        <Input
          type="date"
          placeholder="DD-MM-YYYY"
          actionOnChange={actionOnChange}
          value={value}
        />
      </div>
    </div>
  )
}

export default date;
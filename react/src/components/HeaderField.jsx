import React from 'react';

const HeaderField = props => {
  const { i, handleChange } = props;
  return (
    <label>
      Header:
      <input type="text" name={`headerKey${i}`} placeholder="key" onChange={handleChange} />
      <input type="text" name={`headerValue${i}`} placeholder="value" onChange={handleChange} />
    </label>
  );
};

export default HeaderField;

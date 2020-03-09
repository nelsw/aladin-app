import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Select = props => {
  const {
    className,
    value,
    onChange,
    onBlur,
    options,
    placeholder,
    Key,
    disabled,
  } = props;
  return (
    <select
      className={className || 'form-control'}
      value={value || ''}
      onChange={onChange || null}
      onBlur={onBlur || null}
      disabled={!!disabled}
    >
      <option value="">{placeholder || 'Select Value'}</option>
      {options
        ? options.map(
            (item, index) =>
              Key && Key.includes('Index') ? (
                <option value={index} key={index}>
                  {Key ? item[Key[1]] : item}
                </option>
              ) : (
                <option value={Key ? item[Key[0]] : item} key={index}>
                  {Key ? item[Key[1]] : item}
                </option>
              )
            // return null;
          )
        : null}
    </select>
  );
};

export default Select;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Input = props => {
  const {
    type,
    className,
    value,
    style,
    onChange,
    onBlur,
    placeholder,
    checked,
    noClass,
    id,
    disabled,
    reference,
  } = props;
  return (
    <input
      type={type || 'text'}
      className={noClass ? '' : className || 'form-control'}
      value={value || ''}
      style={style || {}}
      checked={checked || ''}
      onChange={onChange || null}
      onBlur={onBlur || null}
      placeholder={placeholder || 'Input'}
      disabled={!!disabled}
      ref={reference || null}
    />
  );
};

export default Input;

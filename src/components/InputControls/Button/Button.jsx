import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Button = props => {
  const { type, className, value, onClick, disabled, style } = props;
  return (
    <button
      type={type || 'button'}
      className={className ? `btn ${className}` : 'btn'}
      onClick={onClick || null}
      disabled={disabled || false}
      style={style||null}
    >
      {props.children}
    </button>
  );
};

export default Button;

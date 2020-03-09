import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Image = props => {
  const { src, className, alt, style, height, width, onClick } = props;
  return (
    <img
      src={src}
      className={className}
      alt={alt || 'Image'}
      style={style || {}}
      height={height || null}
      width={width || null}
      onClick={onClick || null}
    />
  );
};

export default Image;

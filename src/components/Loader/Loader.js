import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Image from '../Image/Image.jsx';

const style = {
  loader: {
    position: 'fixed',
    zIndex: '100000',
    width: '100%',
    height: '100%',
    top: 0,
  },
  loaderBackdrop: {
    background: 'rgba(255, 255, 255, 0.83)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loaderImg: {
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column',
    color: '#000',
  },
};

const Loader = props => (
  <div style={style.loader}>
    <div style={style.loaderBackdrop} />
    <div style={style.loaderImg}>
      <Image src={require('../../img/loader1.svg')} />
      {props.label}
    </div>
  </div>
);

export default Loader;

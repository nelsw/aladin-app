import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

const rootEl = document.getElementById('app-site');

// Create a reusable render method that we can call more than once
const render = () => {
  // Dynamically import our main App component, and render it
  const App = require('./App').default;
  ReactDOM.render(<App />, rootEl);
};

if (module.hot) {
  module.hot.accept('./App', () => {
    const App = require('./App').default;
    render(<App />, rootEl);
  });
}

render();

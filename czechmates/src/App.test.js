import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('Renders Basic div', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
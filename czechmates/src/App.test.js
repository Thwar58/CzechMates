import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('Renders The App', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
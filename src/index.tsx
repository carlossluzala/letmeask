import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase'

ReactDOM.render(
  <React.StrictMode>
    <App />
    <div></div>
  </React.StrictMode>,
  document.getElementById('root')
);

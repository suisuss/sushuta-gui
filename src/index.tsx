import { Web3ReactProvider } from '@web3-react/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Toaster } from 'react-hot-toast';
import { getLibrary } from './utils'
import App from './App';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';



ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <Router>
      <Toaster />
      <App />
    </Router>
  </Web3ReactProvider>,
  document.getElementById('root') as HTMLElement
);

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const alertOptions = {
  timeout: 5000,
  position: 'top right'
};

const app = (
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <App />
    </AlertProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

import React from 'react';
import { Provider } from "react-redux";
import {store} from './redux/store';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.scss';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  </Provider>
);

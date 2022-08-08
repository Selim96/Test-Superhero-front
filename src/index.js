import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
// import { store } from './redux/store';
import './index.css';
import App from './components/App.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter basename='/superheros'>
    
    <App />
  
  </BrowserRouter>
  </>
);

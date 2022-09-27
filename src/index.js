import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FormThemeProvider } from 'react-form-component';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <FormThemeProvider>
        <App />
      </FormThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
);

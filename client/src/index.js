import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
  <React.StrictMode>
    <div className="app-header">
      <h1>Job Search API</h1>
    </div> 
    <App />
  </React.StrictMode>
);


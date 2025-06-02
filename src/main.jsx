import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router>
       <UserProvider>
      <App />
    </UserProvider>
    </Router>
  </React.StrictMode>
);


  


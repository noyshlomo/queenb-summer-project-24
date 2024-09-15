import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import App from './App';
import { DuckProvider } from './context/DuckContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <DuckProvider>
      <App /> 
    </DuckProvider>
    </UserProvider>
  </React.StrictMode>
);

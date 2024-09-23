import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; 
import App from './App';
import { UserProvider } from './context/UserContext';
import { RecipesContextProvider } from './context/RecipesContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Remove React.StrictMode to avoid double rendering in development
  <React.StrictMode>
  <RecipesContextProvider>
    <UserProvider>
      <App /> 
    </UserProvider>
  </RecipesContextProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';   // Vérifie le chemin et l'existence
import App from './components/App'; // Vérifie le nom et l'emplacement

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

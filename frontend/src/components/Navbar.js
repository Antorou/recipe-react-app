import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1><Link to="/">RECETTES</Link></h1>
      <ul>
        <li><Link to="/">Accueil</Link></li>
        <li><Link to="/add">Ajouter une recette</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

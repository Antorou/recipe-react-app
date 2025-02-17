import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import RecipeList from './RecipeList';
import RecipeForm from './RecipeForm';
import RecipeDetail from './RecipeDetail';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  // Fonction pour ajouter une recette
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  // Fonction pour supprimer une recette
  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(recipe => recipe.id !== id));
  };

  // Fonction pour charger toutes les recettes (ou les récupérer depuis l'API)
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('http://localhost:8000/recipes');
      const data = await response.json();
      setRecipes(data);
    };
 
    fetchRecipes();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<RecipeList recipes={recipes} onDelete={deleteRecipe} />}
        />
        <Route
          path="/add"
          element={<RecipeForm onAdd={addRecipe} />}
        />
        <Route
          path="/edit/:id"
          element={<RecipeForm recipes={recipes} onAdd={addRecipe} />}
        />
        <Route
          path="/recipe/:id"
          element={<RecipeDetail recipes={recipes} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

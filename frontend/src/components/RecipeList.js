import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import '../styles/RecipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const url = "http://localhost:8000/recipes";

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        setRecipes(json); // Mise à jour de l'état avec les données reçues
      } catch (error) {
        console.error("Erreur de chargement:", error.message);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-container">
      <div className="recipe-list">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;

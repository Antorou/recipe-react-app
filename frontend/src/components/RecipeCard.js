import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeCard.css';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <div className="recipe-card" onClick={() => navigate(`/recipe/${recipe._id}`)}>
      {recipe.image && <img src={recipe.image} alt={recipe.title} className="recipe-card-image" />}
      <h3>{recipe.title}</h3>
    </div>
  );
};

export default RecipeCard;

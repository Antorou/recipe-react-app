import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const url = `http://localhost:8000/recipe?id=${id}`;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Erreur serveur: ${response.status}`);
        }

        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      }
    };

    fetchRecipe();
  }, [url]);

  // Fonction pour supprimer la recette
  const handleDelete = async () => {
    const deleteUrl = `http://localhost:8000/recipe/${id}`;
    try {
      const response = await fetch(deleteUrl, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error(`Erreur de suppression: ${response.status}`);
      }
      // Rediriger vers la liste des recettes après suppression
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  // Fonction pour mettre à jour la recette
  const handleUpdate = async () => {
    navigate(`/edit/${id}`);
  };

  if (!recipe) return <p>Chargement...</p>;

  return (
    <div className="recipe-detail">
      <h2>{recipe.title}</h2>
      {recipe.image && <img src={recipe.image} alt={recipe.title} />}

      <h3>Ingrédients :</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3>Étapes :</h3>
      <ul>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

      <h3>Temps de préparation:</h3> <p>{recipe.prepTime} minutes</p>
      <h3>Temps de cuisson:</h3> <p>{recipe.cookTime} minutes</p>
      <h3>Difficulté:</h3> <p>{recipe.difficulty}</p>
      <h3>Note:</h3> <p>{recipe.rating}</p>

      <button onClick={handleDelete}>Supprimer</button>
      <button onClick={handleUpdate}>Modifier</button>
      <button onClick={() => navigate('/')}>Retour</button>
    </div>
  );
};

export default RecipeDetail;

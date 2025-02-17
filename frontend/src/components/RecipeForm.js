import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/RecipeForm.css';

const RecipeForm = () => {
  const { id } = useParams(); // Récupérer l'ID si on est en modification
  const navigate = useNavigate();

  // État pour stocker la recette
  const [recipe, setRecipe] = useState({
    title: '',
    category: '',
    prepTime: '',
    difficulty: 'Facile',
    rating: 1,
    image: ''
  });

  const [ingredientsList, setIngredientsList] = useState([]); // Liste des ingrédients
  const [stepsList, setStepsList] = useState([]); // Liste des étapes

  // Charger une recette existante si `id` est présent
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8000/recipe?id=${id}`)
        .then(response => response.json())
        .then(data => {
          console.log('Recette chargée:', data); // Vérifiez ce qui est chargé ici
          setRecipe(data);
          setIngredientsList(data.ingredients ? data.ingredients.split(',') : []);
          setStepsList(data.steps ? data.steps.split(',') : []);
        })
        .catch(error => console.error("Erreur de chargement:", error));
    }
  }, [id]);

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // Fonction pour ajouter un ingrédient
  const handleAddIngredient = () => {
    if (recipe.ingredients.trim()) {
      setIngredientsList([...ingredientsList, recipe.ingredients.trim()]);
      setRecipe({ ...recipe, ingredients: '' }); // Réinitialiser le champ
    }
  };

  // Fonction pour ajouter une étape
  const handleAddStep = () => {
    if (recipe.steps.trim()) {
      setStepsList([...stepsList, recipe.steps.trim()]);
      setRecipe({ ...recipe, steps: '' }); // Réinitialiser le champ
    }
  };

  // Fonction pour soumettre le formulaire (POST pour créer, PATCH pour modifier)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PATCH" : "POST";
    const url = id ? `http://localhost:8000/recipe/${id}` : "http://localhost:8000/recipe";

    const updatedRecipe = {
      ...recipe,
      ingredients: ingredientsList.join(', '),
      steps: stepsList.join(', ')
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedRecipe)
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur: ${response.status}`);
      }

      navigate('/'); // Redirection vers la liste des recettes
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Titre :
        <input type="text" name="title" value={recipe.title} onChange={handleChange} required />
      </label>
      <label>
        Catégorie :
        <input type="text" name="category" value={recipe.category} onChange={handleChange} required />
      </label>


      <label>
        Ingrédients :
        <input
          type="text"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
        />
        <button type="button" onClick={handleAddIngredient}>Ajouter un ingrédient</button>
      </label>
      <ul>
        {ingredientsList.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <label>
        Étapes :
        <input
          type="text"
          name="steps"
          value={recipe.steps}
          onChange={handleChange}
        />
        <button type="button" onClick={handleAddStep}>Ajouter une étape</button>
      </label>
      <ul>
        {stepsList.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>

      <label>
        Temps de préparation :
        <input type="text" name="prepTime" value={recipe.prepTime} onChange={handleChange} />
      </label>
      <label>
        Difficulté :
        <select name="difficulty" value={recipe.difficulty} onChange={handleChange}>
          <option value="Facile">Facile</option>
          <option value="Moyen">Moyen</option>
          <option value="Difficile">Difficile</option>
        </select>
      </label>
      <label>
        Note :
        <input type="number" name="rating" value={recipe.rating} onChange={handleChange} min="1" max="5" />
      </label>
      <label>
        URL de l’image :
        <input type="text" name="image" value={recipe.image} onChange={handleChange} />
      </label>
      <button type="submit">{id ? "Modifier" : "Ajouter"} la recette</button>
    </form>
  );
};

export default RecipeForm;

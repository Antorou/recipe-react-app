import { createRecipe, getRecipeById, getRecipes, updateRecipe, deleteRecipe } from './crud.mjs';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';

mongoose.connect('mongodb://localhost:27017/recipes')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/recipe', async (req, res) => {
    const { id } = req.query;
    let tmp = await getRecipeById(id)
    res.json(tmp)
});

app.post('/recipe', async (req, res) => {
  try {
    const recipe = await createRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

app.patch('/recipe/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedRecipe = await updateRecipe(id, updateData);

    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

app.delete('/recipe/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await deleteRecipe(id);

    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json({ message: 'Recipe deleted successfully', recipe: deletedRecipe });  // Retourne un message de succès
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

app.get('/recipes', async (req, res) => {
  let tmp = await getRecipes()
  res.json(tmp)
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

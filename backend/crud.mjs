import mongoose from 'mongoose';


const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  ingredients: [String],
  steps: [String],
  category: String,
  prepTime: Number,
  cookTime: Number,
  difficulty: String,
  rating: Number,
}, { timestamps: true, strict: false });

const Recipe = mongoose.model('Recipe', recipeSchema);

export const getRecipeById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('Invalid ID format');
    return null;
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      console.log('Recipe not found');
      return null;
    }
    console.log('Recipe found:', recipe);
    return recipe;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return null;
  }
};

export const createRecipe = async (recipeData) => {
  try {
    const newRecipe = new Recipe(recipeData);
    console.log("Before Save:", newRecipe);
    const savedRecipe = await newRecipe.save();
    return savedRecipe;
  } catch (error) {
    console.error("Error Creating Recipe:", error);
    throw error;
  }
};

export const updateRecipe = async (id, updateData) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedRecipe) {
      console.log('Recipe not found');
      return null;
    }

    console.log('Recipe updated:', updatedRecipe);
    return updatedRecipe;
  } catch (error) {
    console.error('Error updating recipe:', error);
    return null;
  }
};

export const deleteRecipe = async (id) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      console.log('Recipe not found');
      return null;
    }

    console.log('Recipe deleted:', deletedRecipe);
    return deletedRecipe;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return null;
  }
};

export const getRecipes = async () => {
  try {
    const recipes = await Recipe.find();
    if (!recipes) {
      console.log('No recipes found');
      return [];
    }
    console.log('Recipes found:', recipes);
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

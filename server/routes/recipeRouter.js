const express = require('express');
const { getAllRecipes, getRecipe, getAllUserRecipes, createRecipe, deleteRecipeById } = require('../controllers/recipeController');
const requireAuth = require('../middleware/requireAuth');
const recipeRouter = express.Router();

// Public routes (do not require authentication)
recipeRouter.get('/', getAllRecipes);  // Home route is public
recipeRouter.get('/:id', getRecipe);   // Viewing a specific recipe is public

// Protected routes (require authentication)
recipeRouter.use(requireAuth);  // Apply middleware to routes below

recipeRouter.get('/profile/:userId', getAllUserRecipes);  // Protected: User's recipes
recipeRouter.delete('/profile/:id', deleteRecipeById);    // Protected: Delete recipe
recipeRouter.post('/', createRecipe);                     // Protected: Create recipe

module.exports = recipeRouter;

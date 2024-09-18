const express = require('express');
const recipeRouter = express.Router();
const {getAllRecipes,getRecipe, createRecipe, deleteRecipeById} = require('../controllers/recipeController');


recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getRecipe);

//GET user recipes
recipeRouter.get('/profile/:userId',getAllUserRecipes);

//DELETE recipe by id
recipeRouter.delete('/profile/:id',deleteRecipeById);

//POST request to create a new recipe
recipeRouter.post('/', createRecipe);

module.exports = recipeRouter;
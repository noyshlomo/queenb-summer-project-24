const express = require('express');
const {getAllRecipes,getRecipe,getAllUserRecipes, createRecipe, deleteRecipeById} = require('../controllers/recipeController');
const requireAuth = require('../middleware/requireAuth')
const recipeRouter = express.Router();

//require authentication for all the routes.
recipeRouter.use(requireAuth)

recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getRecipe);

//GET user recipes
recipeRouter.get('/profile/:userId',getAllUserRecipes);

//DELETE recipe by id
recipeRouter.delete('/profile/:id',deleteRecipeById);

//POST request to create a new recipe
recipeRouter.post('/', createRecipe);

module.exports = recipeRouter;
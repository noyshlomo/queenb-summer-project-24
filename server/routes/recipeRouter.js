const express = require('express');
const recipeRouter = express.Router();
const {getAllRecipes,getRecipe, createRecipe} = require('../controllers/recipeController');


recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getRecipe);


//POST request to create a new recipe
recipeRouter.post('/', createRecipe);

module.exports = recipeRouter;
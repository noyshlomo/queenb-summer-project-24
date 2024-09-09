const express = require('express');
const recipeRouter = express.Router();
const {getAllRecipes,getRecipe} = require('../controllers/recipeController');

recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getRecipe);

module.exports = recipeRouter;
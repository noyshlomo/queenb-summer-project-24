const express = require('express');

const recipesRouter = express.Router();

const {createRecipe, getAllRecipes, getRecipe} = require('../controllers/recipeController');

recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', getRecipe);
// POST a new recipe
router.post('/', createRecipe);

module.exports = recipesRouter;
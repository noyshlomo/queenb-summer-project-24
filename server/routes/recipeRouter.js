const express = require('express');
const recipeRouter = express.Router();
const {getAllRecipes,getRecipe, createRecipe} = require('../controllers/recipeController');
// const requireAuth = require('../middleware/requireAuth'); // TODO: CHECK RINA'S CODE


recipeRouter.get('/', getAllRecipes);
recipeRouter.get('/:id', getRecipe);

// recipeRouter.use(requireAuth); // TODO: CHECK RINA'S CODE

//POST request to create a new recipe
recipeRouter.post('/', createRecipe);

module.exports = recipeRouter;
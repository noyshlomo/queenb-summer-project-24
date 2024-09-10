const express = require('express');

const recipesRouter = express.Router();

const {createRecipe, getAllRecipes, getRecipe} = require('../controllers/recipeController');

recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', getRecipe);
// POST a new recipe
router.post('/', createRecipe);

const recipesRouter = express.Router();
const {getAllRecipes} = require('../controllers/recipeController');

recipesRouter.get('/',getAllRecipes);
//router.get('/', getAllDucks)


module.exports = recipesRouter;
const express = require('express');
const recipesRouter = express.Router();
const {getAllRecipes} = require('../controllers/recipeController');

recipesRouter.get('/',getAllRecipes);
//router.get('/', getAllDucks)

module.exports = recipesRouter;
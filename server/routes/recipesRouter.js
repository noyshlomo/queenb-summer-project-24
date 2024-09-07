const express = require('express');
const recipesRouter = express.Router();

const { 
    getAllRecipes,
    getAllUserRecipes,
    deleteRecipe,
    updateRecipe
  
 } = require('../controllers/RecipesController')

 // GET all recipes
recipesRouter.get('/',getAllRecipes);

//GET user recipes
recipesRouter.get('/:id',getAllUserRecipes);

// DELETE a recipe
recipesRouter.delete('/:id', deleteRecipe)

// UPDATE a recipe
recipesRouter.patch('/:id', updateRecipe)

module.exports = recipesRouter;





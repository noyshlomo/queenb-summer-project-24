const express = require('express');
const recipesRouter = express.Router();

const { 
    getAllUserRecipes,
    deleteRecipeById,
   
 } = require('../controllers/RecipesController')


//GET user recipes
recipesRouter.get('/:userId',getAllUserRecipes);

//DELETE recipe by id
recipesRouter.delete('/:id',deleteRecipeById);


module.exports = recipesRouter;





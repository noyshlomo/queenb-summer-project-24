const express = require('express');
const recipesRouter = express.Router();

const { 
    getAllUserRecipes,
   
 } = require('../controllers/RecipesController')


//GET user recipes
recipesRouter.get('/:userId',getAllUserRecipes);

module.exports = recipesRouter;





const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const recipeRouter = express.Router();

const {
  getAllRecipes,
  getRecipe,
  getTags,
  getMaxPrepSteps,
  getFilteredRecipes,
  getIngredients,
  getAllUserRecipes,
  createRecipe,
  deleteRecipeById,
  getRecipeByTitle,
  updateRecipeById
} = require("../controllers/recipeController");

recipeRouter.get("/getTags", getTags);
recipeRouter.get("/getIngredients", getIngredients);
recipeRouter.get("/getMaxPrepSteps", getMaxPrepSteps);
recipeRouter.post("/getFiltered", getFilteredRecipes);
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", getRecipe);
// Protected routes (require authentication)
recipeRouter.use(requireAuth); 

recipeRouter.get("/search/:search", getRecipeByTitle);


//GET user recipes
recipeRouter.get('/profile/:userId',getAllUserRecipes);

//DELETE recipe by id
recipeRouter.delete('/profile/:id',deleteRecipeById);

//Update recipe by id
recipeRouter.put('/profile/:id',updateRecipeById);

//POST request to create a new recipe
recipeRouter.post('/', createRecipe);

module.exports = recipeRouter;
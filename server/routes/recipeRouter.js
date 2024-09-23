const express = require('express');
const { getAllRecipes, getRecipe, getAllUserRecipes, createRecipe, deleteRecipeById } = require('../controllers/recipeController');
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
} = require("../controllers/recipeController");

recipeRouter.get("/getTags", getTags);
recipeRouter.get("/getIngredients", getIngredients);
recipeRouter.get("/getMaxPrepSteps", getMaxPrepSteps);
recipeRouter.post("/getFiltered", getFilteredRecipes);
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", getRecipe);
// Protected routes (require authentication)
recipeRouter.use(requireAuth); 
recipeRouter.get("/profile/:userId", getAllUserRecipes);
recipeRouter.delete("/profile/:id", deleteRecipeById);
recipeRouter.post("/", createRecipe);
recipeRouter.get("/search/:search", getRecipeByTitle);

module.exports = recipeRouter;

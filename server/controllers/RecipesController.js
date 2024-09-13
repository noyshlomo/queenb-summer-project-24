const RecipesDB = require('../models/RecipesModel');

// get user profile 
const getAllUserRecipes = async (req, res) => {
    const { userId } = req.params

    try {
        // Fetch recipes from the database
    const recipe = await RecipesDB.find({ userId: userId });

    // If no recipes found, return 404
    if(!recipe){
        console.log('No recipes found for this user')
        return res.status(404).json({error: 'No recipes found for this user'})
    }
    console.log('works controller')
    // Return the recipes
    res.status(200).json(recipe)

    }
    catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


// Delete a recipe by ID
const deleteRecipeById = (async (req, res) => {
    const { id } = req.params;
  
    try {
      const recipe = await RecipesDB.findByIdAndDelete(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = {
    getAllUserRecipes,
    deleteRecipeById
}
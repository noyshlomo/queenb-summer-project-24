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


module.exports = {
    getAllUserRecipes,
}
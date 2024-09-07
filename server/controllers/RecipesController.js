const RecipesDB = require('../models/RecipesModel');


//get all recipes
const getAllRecipes = async(req,res) => {
    try{
        const recipes = await RecipesDB.find();
        res.status(200).json(recipes);
    }
    catch(err) {
        res.status(400).json({msg:'error catching data' ,err});
    }

}


//get user profile 
const getAllUserRecipes = async (req, res) => {
    const {id} = req.params

    // Validate user ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such User'})
    }

    // Fetch recipes from the database
    const recipe = await RecipesDB.find({ userId: id })

    // If no recipes found, return 404
    if(!recipe){
        return res.status(404).json({error: 'No recipes found for this user'})
    }

    // Return the recipes
    res.status(200).json(recipe)
}

module.exports = {
    getAllRecipes,
    getAllUserRecipes
}
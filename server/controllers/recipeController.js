const Recipe = require('../models/RecipeModel');

const getAllRecipes = async(req,res) => {
    try{
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    }
    catch(err) {
        res.status(400).json({msg:'error catching data' ,err});
    }

}

const getRecipe = async(req,res) => {
    try{
        const recipe = await Recipe.findById(req.params.id);
        res.status(200).json(recipe);
    }
    catch(err) {
        res.status(400).json({msg:'error catching data' ,err});
    }
}

module.exports = {
    getAllRecipes,
    getRecipe
}
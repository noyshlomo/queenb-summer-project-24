const RecipeDB = require('../models/RecipeModel');

const getAllRecipes = async(req,res) => {
    try{
        const recipes = await RecipeDB.find();
        res.status(200).json(recipes);
    }
    catch(err) {
        res.status(400).json({msg:'error catching data' ,err});
    }

}

const getRecipe = async(req,res) => {
    try{
        const recipe = await RecipeDB.findById(req.params.id);
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
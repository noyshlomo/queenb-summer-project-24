const RecipesDB = require('../models/RecipesModel');

const getAllRecipes = async(req,res) => {
    try{
        const recipes = await RecipesDB.find();
        res.status(200).json(recipes);
    }
    catch(err) {
        res.status(400).json({msg:'error catching data' ,err});
    }

}

module.exports = {
    getAllRecipes
}
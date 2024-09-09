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

const getRecipe = async(req,res) => {
    try{
        const recipe = await RecipesDB.findById(req.params.id);
        res.status(200).json(recipe);
    }
    catch(err) {
        res.status(400).json({msg:'error catching data' ,err});
    }
}

// create a new recipe 
const createRecipe = async (req, res) => {
    const {title, prepTime, imgLink, submissionTime, description, ingredients, prepSteps, tags, userId} = req.body;

    try {
        const recipe =  await RecipesDB.create({title, prepTime, imgLink, submissionTime, description, ingredients, prepSteps, tags, userId});
        res.status(200).json({ recipe });
    } catch (err) {
        res.status(400).json({msg: 'error creating recipe', err})
    }
}

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
}
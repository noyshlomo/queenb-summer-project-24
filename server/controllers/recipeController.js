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


// create a new recipe 
const createRecipe = async (req, res) => {
    // destructuring the request body to get the required fields
    const {title, prepTime, imgLink, submissionTime, description, ingredients, prepSteps, tags, userId} = req.body;
    
    // checking if the required fields are provided:

    // defining required fields
    const requiredFields = { title, prepTime, imgLink, submissionTime, description, ingredients, prepSteps, tags, userId };
    
    // Collecting any missing fields
    const emptyFields = Object.keys(requiredFields).filter(field => !requiredFields[field]);

    // if any required fields are missing, returning an error message with the missing fields
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields });
    }

    try {
         // adding the new recipe to the database
        const recipe =  await Recipe.create({title, prepTime, imgLink, submissionTime, description, ingredients, prepSteps, tags, userId});
        // returning the created recipe and a success message
        res.status(200).json({ recipe });
    } catch (err) {
        // returning an error message if there was an error creating the recipe
        res.status(400).json({msg: 'error creating recipe', err})
    }
}

module.exports = {
    getAllRecipes,
    getRecipe,
    createRecipe,
}
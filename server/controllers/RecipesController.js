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
    const recipes = await RecipesDB.find({ _id: id })

    // If no recipes found, return 404
    if(!recipes){
        return res.status(404).json({error: 'No recipes found for this user'})
    }

    // Return the recipes
    res.status(200).json(recipes)
}

// delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params

    // Validate recipe ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Invalid recipe ID'})
    }

    try {
        // Attempt to find and delete the recipe by recipe ID
        const recipe = await RecipesDB.findOneAndDelete({_id: id})

        // If no recipe is found, return 404
        if(!recipe){
            return res.status(404).json({error: 'No such recipe'})
        }

        // Success: return a confirmation message
        res.status(200).json({ message: 'Recipe deleted successfully' });
    }catch(error){
        // Catch any server errors
        res.status(500).json({ error: 'Server error' });
    }
}

//update a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params

    // Validate recipe ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such recipe'})
    }

     // Check if request body contains update data
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'No update data provided' });
    }
    try {
        // Attempt to find and update the recipe by recipe ID
        const recipe = await RecipesDB.findOneAndUpdate({ _id: id }, {
            ...req.body
        }, { new: true });

        // If no recipe is found, return 404
        if (!recipe) {
            return res.status(404).json({ error: 'No such recipe' });
        }

        // Return the updated recipe
        res.status(200).json(recipe);
    } catch (error) {
        // Catch any server errors
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = {
    getAllRecipes,
    getAllUserRecipes,
    deleteRecipe,
    updateRecipe
}
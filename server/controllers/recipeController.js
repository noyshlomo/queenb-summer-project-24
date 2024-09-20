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

// get user profile 
const getAllUserRecipes = async (req, res) => {
    const { userId } = req.params

    try {
        // Fetch recipes from the database
    const recipe = await Recipe.find({ userId: userId });
    
    // If no recipes found, return 404
    if(!recipe){
        console.log('No recipes found for this user')
        return res.status(404).json({error: 'No recipes found for this user'})
    }
    // Return the recipes
    res.status(200).json(recipe)

    }
    catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal server error' });
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

// Delete a recipe by ID
const deleteRecipeById = (async (req, res) => {
    const { id } = req.params;
  
    try {
      const recipe = await Recipe.findByIdAndDelete(id);
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

// Update a recipe by ID
const updateRecipeById = (async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body; // The updated data from the client
  
    try {
        const recipe = await Recipe.findByIdAndUpdate(id, updatedData, {
            new: true, // This option returns the updated document
            runValidators: true, // Ensures the updated data passes schema validation
        });
        
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

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
    getAllUserRecipes,
    deleteRecipeById,
    createRecipe,
    updateRecipeById
}

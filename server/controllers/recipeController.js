const Recipe = require("../models/RecipeModel");

// get all recipes (unfiltered)
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(400).json({ msg: "error catching data", err });
  }
};

// get user profile
const getAllUserRecipes = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch recipes from the database
    const recipe = await Recipe.find({ userId: userId });

    // If no recipes found, return 404
    if (!recipe) {
      console.log("No recipes found for this user");
      return res.status(404).json({ error: "No recipes found for this user" });
    }
    // Return the recipes
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get recipe by id
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ msg: "error catching data", err });
  }
};

// get tags(distinct values)
const getTags = async (req, res) => {
  try {
    const tags = await Recipe.aggregate([
      { $unwind: "$tags" }, // Deconstruct the tags array
      { $match: { tags: { $ne: null } } }, // Filter out null values
      { $project: { tags: { $toLower: "$tags" } } }, // Convert tags to lowercase
      { $group: { _id: "$tags" } }, // Group by distinct tags
      { $sort: { _id: 1 } }, // Optional: sort the tags alphabetically
      { $project: { _id: 0, tag: "$_id" } }, // Rename _id to tag and exclude _id
    ]);

    res.status(200).json(tags.map((tag) => tag.tag)); // Return tags as a plain array
  } catch (err) {
    res.status(400).json({ msg: "error fetching tags", err }); // Error handling
  }
};

// get max preparation steps
const getMaxPrepSteps = async (req, res) => {
  try {
    // Aggregation pipeline to find the maximum number of preparation steps
    const result = await Recipe.aggregate([
      {
        $addFields: {
          prepStepsCount: { $size: "$prepSteps" }, // Add a field with the count of prepSteps
        },
      },
      {
        $sort: { prepStepsCount: -1 }, // Sort by the prepStepsCount in descending order
      },
      {
        $limit: 1, // Limit to the top result
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          maxPrepSteps: "$prepStepsCount", // Include only the prepStepsCount field as maxPrepSteps
        },
      },
    ]);

    // Check if a result was found
    if (result.length > 0) {
      res.status(200).json({ maxPrepSteps: result[0].maxPrepSteps }); // Return only the maxPrepSteps value
    } else {
      res.status(404).json({ message: "No recipes found" }); // Handle case where no recipes are found
    }
  } catch (error) {
    console.error("Error fetching max prep steps:", error);
    res.status(500).json({ message: "Server error" }); // Handle server error
  }
};

// get ingredients list (distinct values)
const getIngredients = async (req, res) => {
  try {
    const ingredients = await Recipe.aggregate([
      { $unwind: "$ingredients" }, // Deconstruct the ingredients array
      { $match: { ingredients: { $ne: null } } }, // Filter out null values
      { $project: { ingredients: { $toLower: "$ingredients" } } }, // Convert ingredients to lowercase
      { $group: { _id: "$ingredients" } }, // Group by distinct ingredients
      { $sort: { _id: 1 } }, // Sort alphabetically
    ]);

    // Map the result to the desired format
    const ingredientList = ingredients.map((item) => item._id);

    res.status(200).json(ingredientList); // Return the array of objects
  } catch (err) {
    res.status(400).json({ msg: "Error fetching ingredients", err });
  }
};

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

// create a new recipe
const createRecipe = async (req, res) => {
  // destructuring the request body to get the required fields
  const {
    title,
    prepTime,
    imgLink,
    submissionTime,
    description,
    ingredients,
    prepSteps,
    tags,
    userId,
  } = req.body;

  try {
    // adding the new recipe to the database
    const recipe = await Recipe.create({
      title,
      prepTime,
      imgLink,
      submissionTime,
      description,
      ingredients,
      prepSteps,
      tags,
      userId,
    });
    // returning the created recipe and a success message
    res.status(200).json({ recipe });
  } catch (err) {
    // returning an error message if there was an error creating the recipe
    res.status(400).json({ msg: "error creating recipe", err });
  }
};

// //search
const getRecipeByTitle = async (req, res) => {
  try {
    const response = await Recipe.find({
      title: { $regex: req.params.search, $options: "i" },
    });
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ msg: "error catching data", err });
  }
};

const getFilteredRecipes = async (req, res) => {
  try {
    const { tags, maxPrepSteps, ingredients, sortingMethod, recipeTitle } =
      req.body; // Extract relevant fields from request body
    const tagsArray = Array.isArray(tags) ? tags : []; // Ensure tags is an array
    const ingredientsArray = Array.isArray(ingredients) ? ingredients : []; // Ensure ingredients is an array

    // Function to escape regex special characters
    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // Escape special characters
    };

    let filter = {};

    // Validate maxPrepSteps
    if (maxPrepSteps !== undefined && isNaN(maxPrepSteps)) {
      return res
        .status(400)
        .json({ msg: "maxPrepSteps must be a valid number" });
    }

    // Build filter for tags
    if (tagsArray.length > 0) {
      const regexPatterns = tagsArray.map((tag) => ({
        tags: { $regex: new RegExp(`^${escapeRegExp(tag)}$`, "i") }, // Case-insensitive match
      }));

      filter.$or = regexPatterns; // Match any of the regex patterns
    }

    // Build filter for maxPrepSteps
    if (maxPrepSteps !== undefined) {
      filter.$expr = { $lte: [{ $size: "$prepSteps" }, maxPrepSteps] };
    }

    // Build filter for ingredients
    if (ingredientsArray.length > 0) {
      const regexPatterns = ingredientsArray.map((ingredient) => ({
        ingredients: {
          $regex: new RegExp(`^${escapeRegExp(ingredient)}$`, "i"),
        }, // Case-insensitive match
      }));

      filter.$or = filter.$or
        ? [...filter.$or, ...regexPatterns]
        : regexPatterns; // Combine filters if tags are also present
    }

    // Build filter for recipe title
    if (recipeTitle) {
      filter.title = { $regex: new RegExp(escapeRegExp(recipeTitle), "i") }; // Case-insensitive match for title
    }

    // Define sorting based on sortingMethod
    let sort = {};
    switch (sortingMethod) {
      case 1:
        sort = { submissionTime: -1 }; // Sort by submissionTime (new to old)
        break;
      case 2:
        sort = { prepTime: 1 }; // Sort by prepTime (shortest to longest)
        break;
      default:
        sort = {}; // No sorting
    }

    // Fetch recipes with filter and sorting
    const recipes = await Recipe.find(filter).sort(sort);

    res.status(200).json(recipes);
  } catch (err) {
    console.error("Error fetching recipes:", err); // Log the full error

    // Send a detailed error response
    res.status(500).json({
      msg: "Error fetching recipes",
      error: err.message || "Unknown error", // Ensure a message is sent even if err is empty
    });
  }
};

module.exports = {
  getAllRecipes,
  getRecipe,
  getTags,
  getFilteredRecipes,
  getMaxPrepSteps,
  getIngredients,
  getAllUserRecipes,
  deleteRecipeById,
  createRecipe,
  getRecipeByTitle,
};

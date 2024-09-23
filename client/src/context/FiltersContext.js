import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

const FiltersContext = createContext();

const FiltersProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedMaxPrepSteps, setSelectedMaxPrepSteps] = useState(2);
  const [sortingMethod, setSortingMethod] = useState(0);
  const [recipeTitle, setRecipeTitle] = useState("");

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await api.post("/recipe/getFiltered", {
        tags: selectedTags,
        maxPrepSteps: selectedMaxPrepSteps,
        ingredients: selectedIngredients,
        sortingMethod: sortingMethod,
        recipeTitle: recipeTitle,
      }); // Use POST request
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }, [
    selectedTags,
    selectedMaxPrepSteps,
    selectedIngredients,
    sortingMethod,
    recipeTitle,
  ]);

  useEffect(() => {
    fetchRecipes();
  }, [
    fetchRecipes,
    selectedTags,
    selectedMaxPrepSteps,
    selectedIngredients,
    sortingMethod,
    recipeTitle,
  ]);

  return (
    <FiltersContext.Provider
      value={{
        recipes,
        selectedTags,
        setSelectedTags,
        selectedMaxPrepSteps,
        setSelectedMaxPrepSteps,
        selectedIngredients,
        setSelectedIngredients,
        sortingMethod,
        setSortingMethod,
        recipeTitle,
        setRecipeTitle,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export { FiltersContext, FiltersProvider };

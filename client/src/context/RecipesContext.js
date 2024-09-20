import { createContext, useReducer } from 'react'

export const RecipesContext = createContext()

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_RECIPE':
      const updatedRecipeList = state.recipes.map(recipe =>
        recipe._id === action.payload._id ? action.payload : recipe
      );
      return {
        recipes: updatedRecipeList
      };

    case 'DELETE_RECIPE':
      // console.log('Recipes before deletion:', state.recipes);
      const updatedRecipes = state.recipes.filter(r => r._id !== action.payload._id);
      // console.log('Recipes after deletion:', updatedRecipes);
      return { 
        recipes: updatedRecipes
      }
    default:
      return state;
  }
}


export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, { 
    recipes: []
  })
  
  return (
    <RecipesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RecipesContext.Provider>
  )
}
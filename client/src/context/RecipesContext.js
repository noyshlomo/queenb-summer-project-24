import { createContext, useReducer, useEffect } from 'react'

export const RecipesContext = createContext()

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_RECIPE':
      // console.log('Recipes before deletion:', state.recipes);
      const updatedRecipes = state.recipes.filter(r => r._id !== action.payload._id);
      // console.log('Recipes after deletion:', updatedRecipes);
      return { 
        recipes: updatedRecipes
      }
      case 'SET_RECIPES':{
        return { recipes : action.payload};
      }
    default:
      return state;
  }
}


export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, { 
    recipes: []
  })

  useEffect(()=>{
    async function fetchData(){
        try{
            const response = await fetch ('http://localhost:5000/api/recipe/');
            if(!response.ok){
                throw new Error('Failed to fetch recipes')
            }
            
            const data = await response.json();
            dispatch({ type: 'SET_RECIPES', payload: data });
        }
        catch(error){
            console.error(error);
        }
    }
    fetchData();
},[])
  
  return (
    <RecipesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RecipesContext.Provider>
  )
}
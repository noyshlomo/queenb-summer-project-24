import { React, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RecipePresentation from "../RecipePresentation/RecipePresentation";
import { FiltersContext } from "../../context/FiltersContext";

function DisplayFilteredRecipes() {
  const { setRecipeTitle, recipes } = useContext(FiltersContext);
  const { search } = useParams();

  const searchRecipe = async () => {
    setRecipeTitle(search);
  };

  useEffect(() => {
    searchRecipe();
  }, [search]);

  return (
    <div>
      <h1>Results for {search}</h1>
      <div>
        {recipes.length > 0 ? (
          <div className="container">
            <div className="recipes-grid">
              {recipes.map((recipe) => (
                <RecipePresentation key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </div>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default DisplayFilteredRecipes;

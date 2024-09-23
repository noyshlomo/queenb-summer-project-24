import React, { useContext } from "react";
import "./styles.css";
import { RecipesContext } from "../../context/RecipesContext";
import RecipePresentation from "../RecipePresentation/RecipePresentation";

function DisplayRecipes({}) {
  const { recipes } = useContext(RecipesContext);

  return (
    <div className="container">
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipePresentation key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default DisplayRecipes;

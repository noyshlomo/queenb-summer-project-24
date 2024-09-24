import { React, useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import './styles.css';

function RecipePage() {
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/recipe/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                console.error(err);
            }
        };

        getRecipe();  // Fetch the recipe when the component mounts
    }, [id]);  // Add 'id' to the dependency array to ensure it re-fetches if the recipe ID changes

    return (
        <div className="recipe-container">
            <img src={recipe.imgLink} alt={recipe.title} />
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <h3>Ingredients:</h3>
            <ul>
                {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <ol>
                {recipe.prepSteps && recipe.prepSteps.map((step) => (
                    <li key={step}>{step}</li>
                ))}
            </ol>
            <div className="recipe-tags">
                {recipe.tags && recipe.tags.map((tag) => (
                    <h6 key={tag}>{tag}</h6>
                ))}
            </div>
        </div>
    );
}

export default RecipePage;

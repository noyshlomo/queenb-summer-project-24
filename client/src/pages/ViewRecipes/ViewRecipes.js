import React, { useEffect, useState } from 'react';
import './styles.css';
import RecipePresentation from '../../components/RecipePresentation/RecipePresentation';
import { useUserContext } from '../../hooks/useUserContext';

function ViewRecipes() {
    const [recipes, setRecipes] = useState([]);
    const { user } = useUserContext();

    // Fetch public recipes, and send Authorization header only if user is logged in
    useEffect(() => {
        const getRecipes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/recipe', {
                    headers: user
                        ? {
                              'Authorization': `Bearer ${user.token}`
                          }
                        : {} // No Authorization header for public access
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setRecipes(data);
            } catch (err) {
                console.log(err);
            }
        };

        getRecipes(); 
    }, [user]); 

    return (
        <div className="container">
            <h1>View Recipes</h1>
            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <RecipePresentation key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
}

export default ViewRecipes;

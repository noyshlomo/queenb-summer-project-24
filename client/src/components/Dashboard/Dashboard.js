import React, { useEffect, useState, useCallback  } from 'react';
import styles from './Dashboard.module.css';
import { useParams } from 'react-router-dom';
import { useRecipesContext } from '../../hooks/useRecipesContext';
import Modal from '../../components/Modal/Modal';
import { useUserContext } from '../../hooks/useUserContext';

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [recipeToDelete, setRecipeToDelete] = useState(null); // For tracking which recipe to delete
    const [showModal, setShowModal] = useState(false); // To show or hide the modal
    const { userId } = useParams();
    const { dispatch } = useRecipesContext(); 
    const { user } = useUserContext(); // Get the user context

    // Memoize getRecipe function
    const getRecipe = useCallback(async () => {
        if (!user) {
            return; // Prevent the fetch if no user is logged in
        }
        try {
            const response = await fetch(`http://localhost:5000/api/recipe/profile/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch recipe');
            }
            const data = await response.json();
            setRecipes(data);
        } catch (err) {
            console.log(err);
        }
    }, [user, userId]);

    // Use the memoized getRecipe function
    useEffect(() => {
        if (user) {
            getRecipe();
        }
    }, [user, getRecipe, dispatch]);

    // Show the modal and store the recipe to be deleted
    const handleDeleteClick = (recipeId) => {
        if (!user) {
            return alert('Please log in to delete a recipe');
        }
        setRecipeToDelete(recipeId); // Store the recipe ID
        setShowModal(true); // Show the modal
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/recipe/profile/' + recipeToDelete, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the recipe');
            }
    
            const json = await response.json();

            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe._id !== recipeToDelete)
            );

            dispatch({ type: 'DELETE_RECIPE', payload: json });
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };
    

    // Close the modal without deleting the recipe
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h1>My Recipes</h1>
            {/* Show message if no user is logged in */}
            {!user ? (
                <p>Please log in to view the recipes.</p>
            ) : (
                Array.isArray(recipes) ? (
                    recipes.map((recipe) => (
                        <div key={recipe._id} className={styles.recipeCard}>
                            {recipe.imgLink && (
                                <img
                                    src={recipe.imgLink}
                                    alt={recipe.title}
                                    className={styles.recipeImage}
                                />
                            )}
                            <h1>{recipe.title}</h1>
                            <p>{recipe.description}</p>
                            <p>{recipe.prepTime}</p>
                            <button onClick={() => handleDeleteClick(recipe._id)}>Delete</button>
                        </div>
                    ))
                ) : 'No recipes found'
            )}

            {/* Modal Component */}
            <Modal
                show={showModal}
                onClose={closeModal}
                onConfirm={confirmDelete}
                message="Are you sure you want to delete this recipe?"
            />
        </div>
    );
};

export default Dashboard;

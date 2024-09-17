import React, { useEffect, useState, useCallback  } from 'react';
import styles from './Dashboard.module.css';
import { useParams } from 'react-router-dom';
import { useRecipesContext } from '../../hooks/useRecipesContext';
import Modal from '../../components/Modal/Modal';

const Dashboard = () => {
    const [recipes, setRecipes] = useState([]);
    const [recipeToDelete, setRecipeToDelete] = useState(null); // For tracking which recipe to delete
    const [showModal, setShowModal] = useState(false); // To show or hide the modal
    const { userId } = useParams();
    const { dispatch } = useRecipesContext(); 
  
    // Memoize getRecipe function
    const getRecipe = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/recipe/profile/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipe');
            }
            const data = await response.json();
            setRecipes(data);
        } catch (err) {
            console.log(err);
        }
    }, [userId]);


    // Use the memoized getRecipe function
    useEffect(() => {
        getRecipe();
    }, [getRecipe]);

    // Show the modal and store the recipe to be deleted
    const handleDeleteClick = (recipeId) => {
        setRecipeToDelete(recipeId); // Store the recipe ID
        setShowModal(true); // Show the modal
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/recipe/profile/' + recipeToDelete, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the recipe');
            }
    
            const json = await response.json();
            // console.log('Deleted recipe:', json);
    
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
            {Array.isArray(recipes)
                ? recipes.map((recipe) => (
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
                : 'No recipes found'}

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

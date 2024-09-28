import React, { useEffect, useState, useCallback } from 'react';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecipesContext } from '../../hooks/useRecipesContext';
import Modal from '../../components/Modal/Modal';
import { useUserContext } from '../../hooks/useUserContext';
import EditForm from '../../components/EditForm/EditForm';

const Dashboard = () => {
    
    const [recipes, setRecipes] = useState([]);
    const [recipeToEdit, setRecipeToEdit] = useState(null); 
    const [recipeToDelete, setRecipeToDelete] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const { dispatch } = useRecipesContext(); 
    const { user } = useUserContext(); 
    const navigate = useNavigate();
    const userId = user?._id;

    const getRecipe = useCallback(async () => {
        if (!user) return;

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/api/recipe/profile/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch recipes');
            const data = await response.json();
            setRecipes(data);
        } catch (err) {
            setError(err.message); 
        } finally {
            setLoading(false); 
        }
    }, [user, userId]);

    // Fetch recipes on component mount or user change
    useEffect(() => {
        if (user) {
            getRecipe();
        }
    }, [user, getRecipe]);

    const handleRecipeClick = (recipeId) => {
        navigate(`/${recipeId}`); 
    };

    const handleEditClick = (recipeId) => {
        const recipe = recipes.find((recipe) => recipe._id === recipeId);
        setRecipeToEdit(recipe); 
    };

    const handleCancelEdit = () => {
        setRecipeToEdit(null);
    };

    const handleUpdateRecipe = (updatedRecipe) => {
        setRecipes((prevRecipes) => 
            prevRecipes.map((recipe) => 
                recipe._id === updatedRecipe._id ? updatedRecipe : recipe
            )
        );
        dispatch({ type: 'UPDATE_RECIPE', payload: updatedRecipe }); 
    };

    const handleDeleteClick = (recipeId) => {
        if (!user) return alert('Please log in to delete a recipe');
        setRecipeToDelete(recipeId);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/recipe/profile/${recipeToDelete}`, {
                method: 'DELETE', 
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });

            if (!response.ok) throw new Error('Failed to delete the recipe');

            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe._id !== recipeToDelete)
            );

            dispatch({ type: 'DELETE_RECIPE', payload:  { _id: recipeToDelete } });
            
            setShowModal(false);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.dashboardContainer}>
             {!recipeToEdit && <h1>My Recipes</h1>}

            {!user ? (
                <p>Please log in to view the recipes.</p>
            ) : (
                <>
                    {loading && <p>Loading recipes...</p>}
                    {error && <p>{error}</p>}

                    {recipeToEdit ? (
                        <EditForm 
                            recipeId={recipeToEdit._id} 
                            onCancel={handleCancelEdit} 
                            setRecipeToEdit={setRecipeToEdit}
                            onUpdateRecipe={handleUpdateRecipe}
                        />
                    ) : (
                        <div className={styles.recipeList}>
                            {recipes.length > 0 ? (
                                recipes.map((recipe) => (
                                    <div key={recipe._id} className={styles.recipeCard} onClick={() => handleRecipeClick(recipe._id)}>
                                        {recipe.imgLink && (
                                            <img
                                                src={recipe.imgLink}
                                                alt={recipe.title}
                                                className={styles.recipeImage}
                                            />
                                        )}
                                        <div className={styles.recipeInfo}>
                                            <h1 className={styles.recipeTitle}>{recipe.title}</h1>
                                            <p className={styles.recipeDescription}>{recipe.description}</p>
                                        </div>
                                        <p className={styles.recipePrepTime}>Preparation Time: {recipe.prepTime} mins</p>
                                        <div className={styles.actions}>
                                            <button onClick={(e) => { e.stopPropagation(); handleEditClick(recipe._id); }} className={styles.editButton}>Edit</button>
                                            <button onClick={(e) => { e.stopPropagation(); handleDeleteClick(recipe._id); }} className={styles.deleteButton}>Delete</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No recipes found</p>
                            )}

                            {/* Modal for delete confirmation */}
                            <Modal
                                show={showModal}
                                onClose={closeModal}
                                onConfirm={confirmDelete}
                                message="Are you sure you want to delete this recipe?"
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;



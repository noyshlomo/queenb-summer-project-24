// import React, { useEffect, useState } from 'react';
// import styles from './Dashboard.module.css';
// import { useParams} from 'react-router-dom'
// import { useRecipesContext } from '../../hooks/useRecipesContext';
// /*
// 1. when press delete get an error - need to fix
// 2. add a pop up message before deleting
// 3. 

// */
// //display user content
// const Dashboard = () => {
//     const [recipes, setRecipes] = useState([])
//     const { userId } = useParams();
//     const { dispatch } = useRecipesContext()

//     const getRecipes = async() => {
//         try{
//             const response = await fetch(`http://localhost:5000/api/recipes/${ userId }`)
//             if(!response.ok){
//                 throw new Error('Failed to fetch recipe')
//             }
//             const data = await response.json();
//             console.log(data)
//             setRecipes(data);
//         }
//         catch(err){
//             console.log(err);
//             return <div>Not Found</div>///דף שגוי - לתקן
//         }
//     }


//     useEffect(()=>{getRecipes();},[userId]);

//     useEffect(() => {
//         console.log('Recipes state updated:', recipes); // Check if recipes state updates correctly
//       }, [recipes]);
      

//       const handleClick = async (recipeId) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
//         if (!confirmDelete) return; // Stop if user cancels
    
//         try {
//             const response = await fetch('http://localhost:5000/api/recipes/' + recipeId, {
//                 method: 'DELETE'
//             });
    
//             if (!response.ok) {
//                 throw new Error('Failed to delete the recipe');
//             }
    
//             const json = await response.json();
//             console.log('Deleted recipe:', json);
    
//             // Dispatch action to remove the recipe from state
//             dispatch({ type: 'DELETE_RECIPE', payload: json });
//         } catch (error) {
//             console.log('Error deleting recipe:', error);
//         }
//     };
    
    
//   return (
//     <div> 
//      <h1>My Recipes</h1> 
//             {Array.isArray(recipes) ? recipes.map(recipe => ( 
//                 <div key={recipe._id} className={styles.recipeCard}> 
//                     {/* Display the image */}
//                     {recipe.imgLink && <img src={recipe.imgLink} alt={recipe.title} className={styles.recipeImage} />} 
//                     <h1>{recipe.title}</h1> 
//                     <p>{recipe.description}</p> 
//                     <p>{recipe.prepTime}</p> 
//                     <button onClick={() => handleClick(recipe._id)}>delete</button>
//                 </div> 
//             )) : (
//                 <p>No recipes found</p> // Fallback content
//             )}
//    </div> 
//   )
// }

// import React, { useEffect, useState } from 'react';
// import styles from './Dashboard.module.css';
// import { useParams } from 'react-router-dom';
// import { useRecipesContext } from '../../hooks/useRecipesContext';
// import Modal from '../../components/Modal/Modal';

// const Dashboard = () => {
//     const [recipes, setRecipes] = useState([]);
//     const [recipeToDelete, setRecipeToDelete] = useState(null); // For tracking which recipe to delete
//     const [showModal, setShowModal] = useState(false); // To show or hide the modal
//     const { userId } = useParams();
//     const { dispatch } = useRecipesContext();

//     const getRecipes = async () => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/recipes/${userId}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch recipes');
//             }
//             const data = await response.json();
//             setRecipes(data);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getRecipes();
//     }, [userId]);

//     useEffect(() => {
//         console.log('Recipes state updated:', recipes);
//     }, [recipes]);

//     // Show the modal and store the recipe to be deleted
//     const handleDeleteClick = (recipeId) => {
//         setRecipeToDelete(recipeId); // Store the recipe ID
//         setShowModal(true); // Show the modal
//     };

//     // Confirm the deletion and delete the recipe
//     const confirmDelete = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/recipes/' + recipeToDelete, {
//                 method: 'DELETE',
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete the recipe');
//             }

//             const json = await response.json();
//             console.log('Deleted recipe:', json);

//             // Dispatch action to remove the recipe from state
//             dispatch({ type: 'DELETE_RECIPE', payload: json });
//             setShowModal(false); // Hide the modal after deletion
//         } catch (error) {
//             console.log('Error deleting recipe:', error);
//         }
//     };

//     // Close the modal without deleting the recipe
//     const closeModal = () => {
//         setShowModal(false);
//     };

//     return (
//         <div>
//             <h1>My Recipes</h1>
//             {Array.isArray(recipes)
//                 ? recipes.map((recipe) => (
//                       <div key={recipe._id} className={styles.recipeCard}>
//                           {recipe.imgLink && (
//                               <img
//                                   src={recipe.imgLink}
//                                   alt={recipe.title}
//                                   className={styles.recipeImage}
//                               />
//                           )}
//                           <h1>{recipe.title}</h1>
//                           <p>{recipe.description}</p>
//                           <p>{recipe.prepTime}</p>
//                           <button onClick={() => handleDeleteClick(recipe._id)}>Delete</button>
//                       </div>
//                   ))
//                 : 'No recipes found'}

//             {/* Modal Component */}
//             <Modal
//                 show={showModal}
//                 onClose={closeModal}
//                 onConfirm={confirmDelete}
//                 message="Are you sure you want to delete this recipe?"
//             />
//         </div>
//     );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
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

    const getRecipes = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/recipes/${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }
            const data = await response.json();
            setRecipes(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getRecipes();
    }, [userId]);

    useEffect(() => {
        console.log('Recipes state updated:', recipes);
    }, [recipes]);

    // Show the modal and store the recipe to be deleted
    const handleDeleteClick = (recipeId) => {
        setRecipeToDelete(recipeId); // Store the recipe ID
        setShowModal(true); // Show the modal
    };

    // Confirm the deletion and delete the recipe
    const confirmDelete = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/recipes/' + recipeToDelete, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the recipe');
            }

            const json = await response.json();
            console.log('Deleted recipe:', json);

            // Update the local state by filtering out the deleted recipe
            setRecipes((prevRecipes) =>
                prevRecipes.filter((recipe) => recipe._id !== recipeToDelete)
            );

            // Dispatch action to remove the recipe from global state/context if necessary
            dispatch({ type: 'DELETE_RECIPE', payload: json });
            
            setShowModal(false); // Hide the modal after deletion
        } catch (error) {
            console.log('Error deleting recipe:', error);
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

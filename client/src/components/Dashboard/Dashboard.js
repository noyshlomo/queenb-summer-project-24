import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import axios from 'axios';




//display user content
const Dashboard = ({ userId }) => {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:3000/${userId}`)
          .then(response => {
            setRecipes(response.data);
          })
          .catch(error => {
            console.error('Error fetching recipes:', error);
          });
      }, [userId]);

  return (
   <div>
    <h1>Your Recipes</h1>
    {recipes.map(recipe => (
      <div key={recipe._id}>
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>
      </div>
    ))}
   </div>
  );
};

export default Dashboard;

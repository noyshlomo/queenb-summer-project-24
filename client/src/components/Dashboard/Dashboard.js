import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { useParams} from 'react-router-dom'

//display user content
const Dashboard = () => {
    const [recipe, setRecipe] = useState([])
    const { userId } = useParams();
    const getRecipe = async() => {
        try{
            const response = await fetch(`http://localhost:5000/api/recipes/${ userId }`)
            if(!response.ok){
                throw new Error('Failed to fetch recipe')
            }
            const data = await response.json();
            console.log(data)
            setRecipe(data);
        }
        catch(err){
            console.log(err);
            return <div>Not Found</div>///דף שגוי - לתקן
        }
    }

    useEffect(()=>{getRecipe();},[]);

  return (
    <div> 
     <h1>My Recipes</h1> 
            {Array.isArray(recipe) ? recipe.map(recip => ( 
                <div key={recip._id} className={styles.recipeCard}> 
                    {/* Display the image */}
                    {recip.imgLink && <img src={recip.imgLink} alt={recip.title} className={styles.recipeImage} />} 
                    <h1>{recip.title}</h1> 
                    <p>{recip.description}</p> 
                </div> 
            )) : (
                <p>No recipes found</p> // Fallback content
            )}
   </div> 
  )
}

export default Dashboard;

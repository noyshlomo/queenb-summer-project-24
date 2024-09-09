import {React, useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import './styles.css'

function RecipePage({props}) {
    const [recipe, setRecipe] = useState({})
    const {id} = useParams();
    const getRecipe = async() => {
        try{
            const response = await fetch(`http://localhost:5000/api/recipe/${id}`)
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
    <div className="recipe-container">
        <img src={recipe.imgLink} alt={recipe.title}/>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <h3>Ingredients:</h3>
        <ul>
            {recipe.ingredients && recipe.ingredients.map((ingredient) => {
                return <li key={ingredient}>{ingredient}</li>
            })}
        </ul>
        <h3>Instruction:</h3>
        <ol>{ recipe.prepSteps && recipe.prepSteps.map((step) => {
           return <li key={step}>{step}</li>
        })}</ol>
        <div className="recipe-tags">{recipe.tags && recipe.tags.map((tag) => {return <h6 key={tag}>{tag}</h6>})}</div>
    </div>
  )
}

export default RecipePage
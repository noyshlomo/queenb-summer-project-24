import {React,useEffect,useState} from 'react'
import './styles.css'
import RecipePresentation from '../../components/RecipePresentation/RecipePresentation'

function ViewRecipes() {
    const [recipes, setRecipes] = useState([]);
    const getRecipes = async () =>{
        try{
            const response = await fetch('http://localhost:5000/api/recipe');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setRecipes(data);
        }
        catch(err){
            return console.log(err);
        }
    }

    useEffect(()=>{getRecipes();},[]);

  return (
    <div className="container">
        <h1 >ViewRecipes</h1>
        <div className="recipes-grid">
            {recipes.map((recipe)=>
                (<RecipePresentation recipe={recipe}/>)   
            )}
        </div>
    </div>
  )
}

export default ViewRecipes
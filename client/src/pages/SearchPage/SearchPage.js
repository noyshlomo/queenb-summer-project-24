import { React,useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RecipePresentation from '../../components/RecipePresentation/RecipePresentation';

function SearchPage() {
    const { search } = useParams()
    const [searchResult, setSearchResult] = useState("");

    const searchRecipe = async() =>{
        try{
            const response = await fetch(`http://localhost:5000/api/recipe/search/${search}`)
            if(!response.ok){
                throw new Error('Failed to find result');
            }
            const data = await response.json();
            console.log(data);
            setSearchResult(data);
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{searchRecipe();},[search]);

  return (
    <div>
        <h1>Results for { search }</h1>
        <div>
            {searchResult.length > 0? (searchResult.map((result)=>(
                <RecipePresentation key={result._id} recipe={result} />
            ))) : (<p>No results found</p>)}
        </div>
    </div>
  )
}

export default SearchPage
import { React, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.css'

function SearchBar() {
    const navigate = useNavigate();
    const [ search, setSearch ] = useState("");
    const [ recipeList, setRecipeList ] = useState([]);
    const [ searchOptionList, setSearchOptionList ] =useState([])
    const [ isOptionsVisible,setIsOptionsVisible] = useState(false);


    useEffect(()=>{
        async function fetchData(){
            try{
                const response = await fetch ('http://localhost:5000/api/recipe/');
                if(!response.ok){
                    throw new Error('Failed to fetch recipes')
                }
                
                const data = await response.json();
                setRecipeList(data);
            }
            catch(error){
                console.error(error);
            }
        }
        fetchData();
    },[])

    const handleChange = () =>{
        if(search === '') {return setIsOptionsVisible(false);}
        setSearchOptionList(recipeList.filter((recipe)=>(recipe.title).includes(search)));
        if(searchOptionList.length === 0 )
            {
                return setIsOptionsVisible(false);
            }
        setIsOptionsVisible(true);
    }

    useEffect((handleChange),[search]);

    const handleSubmit = (e) => {
        if(search==='')
        {alert('The field is empty'); 
            return; 
        }
        e.preventDefault();
        setSearch('');
        setSearchOptionList([]);
        navigate(`/search/${search}`);
    }
  return (
    <div >
        <form onSubmit={handleSubmit}>
            <div className="search-input">
            <input type="text" 
            onChange={(e) => 
                {setSearch(e.target.value);}}
            value={search}
            />
            <button type="submit" className='icon'><img src='/search-Icon.png' alt ='search'/></button>
            {isOptionsVisible && 
            <div className="search-option">
            {searchOptionList && searchOptionList.slice(0, 5).map((searchOption)=>
            (<button  className="search-option" onClick={()=>{setSearch(searchOption.title);}}key={searchOption._id}>{searchOption.title}</button>)
            )}
            </div>}
            </div>
        </form>
    </div>
  )
}

export default SearchBar
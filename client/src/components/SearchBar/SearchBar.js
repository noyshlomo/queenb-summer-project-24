import { React, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { RecipesContext } from '../../context/RecipesContext'
import './styles.css'

function SearchBar() {
    const navigate = useNavigate();
    const [ search, setSearch ] = useState("");
    const { recipes } = useContext(RecipesContext)
    const [ searchOptionList, setSearchOptionList ] =useState([])
    const [ isOptionsVisible,setIsOptionsVisible] = useState(false);

    const handleChange = () =>{
        if(search === '') {return setIsOptionsVisible(false);}
        setSearchOptionList(recipes.filter((recipe)=>(recipe.title).includes(search)));
        if(searchOptionList.length === 0 )
            {
                return setIsOptionsVisible(false);
            }
        setIsOptionsVisible(true);
    }

    useEffect((handleChange),[search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(search==='')
        {
            alert('The field is empty'); 
            return; 
        }
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
            <div className="search-options">
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
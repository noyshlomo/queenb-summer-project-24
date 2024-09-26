import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

function RecipePresentation({recipe: props}) {
  return (
    <Link to={`/${props._id}`} className="recipe-card">
        <img src={props.imgLink} alt="placeholder" />
        <h1>{props.title}</h1>
        <h2>{props.description}</h2>
    </Link>
  )
}

export default RecipePresentation
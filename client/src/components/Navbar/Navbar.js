import React from 'react'
import { Link } from 'react-router-dom'
import styles  from '../../styles/App.module.css'
import SearchBar from '../SearchBar/SearchBar'

function Navbar() {
  return (
    <nav>
        <div>
          <Link to="/"><img src="/project-logo.png" alt="Logo" className={styles.appLogo}/></Link>
        </div>
        <div><SearchBar/></div>
    </nav>
  )
}

export default Navbar
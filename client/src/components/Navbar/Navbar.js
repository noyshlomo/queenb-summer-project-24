import React from 'react'
import { Link } from 'react-router-dom'
import styles  from '../../styles/App.module.css'
import SearchBar from '../SearchBar/SearchBar'

function Navbar() {
  return (
    <nav className={styles.appNav}>
          <Link to="/"><img src="/project-logo.png" alt="Logo" className={styles.appLogo}/></Link>
          <Link to="/" className={styles.appLink}>Home</Link>
          <Link to="/profile/:userId" className={styles.appLink}>Profile</Link>
        <div><SearchBar/></div>
    </nav>
  )
}

export default Navbar
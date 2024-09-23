import React from 'react'
import { Link } from 'react-router-dom'
import styles  from '../../styles/App.module.css'
//import {useUserContext} from "../../hooks/useUserContext";

function Navbar() {
  return (
    // const {user} = useUserContext; ////TODO: CHECK RINA'S CODE
    <nav>
        <Link to="/"><img src="/project-logo.png" alt="Logo" className={styles.appLogo}/></Link>
        <Link to="/upload" className={styles.appLink}>Upload</Link>
        {/* {user && (<Link to="/upload" className={styles.appLink}>Upload</Link>)} TODO: CHECK RINA'S CODE */}
    </nav>
  )
}

export default Navbar
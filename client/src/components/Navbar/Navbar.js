import React from 'react'
import { Link } from 'react-router-dom'
//import styles  from '../../styles/App.module.css'
import { useLogout } from '../../hooks/useLogout'
import { useUserContext } from '../../hooks/useUserContext'

function Navbar() {
  const { logout } = useLogout()
  const { user } = useUserContext()

  const handleClick = () => {
    logout()
  }
  return (
    <nav>
       {/* <Link to="/"><img src="/project-logo.png" alt="Logo" className={styles.appLogo}/></Link> */}
      {user && (
        <div>
          <span>{user.email}</span>
          <button onClick={handleClick}>Logout</button>
        </div>
      )}
      {!user && (
        <div>
          <Link to="/login"> Login</Link>
          <Link to="/signup"> Signup</Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar 
import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useUserContext } from '../../hooks/useUserContext'
import SearchBar from '../SearchBar/SearchBar'
import "./styles.css"


function Navbar() {
  const { logout } = useLogout()
  const { user } = useUserContext()

  const handleClick = () => {
    logout()
  }
  return (
    <>
        <div className='logoContainer'>
          <Link to="/"><img src="/project-logo.png" alt="Logo" className="appLogo"/></Link>
        </div>
      <nav className='appNav'>
      <Link to="/" className='appLink'>Home</Link>
        {user && (
          <>
            <Link to="/profile/:userId" className="appLink">Profile</Link>
            <Link to="/upload" className="appLink">Upload</Link>
            <div className='userContainer'>
              <span>{user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className="appLink"> Login</Link>
            <Link to="/signup" className="appLink"> Signup</Link>
          </>
        )}       
      </nav>
      <div className="searchBar"><SearchBar /></div>
      </>
  )
}

export default Navbar
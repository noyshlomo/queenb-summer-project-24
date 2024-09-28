import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import UserProfile from './pages/UserProfile/UserProfile';
import Navbar from './components/Navbar/Navbar';
import RecipePage from './pages/RecipePage/RecipePage';
import SignupPage from './pages/Signup/SignupPage';
import LoginPage from './pages/Login/loginPage';
import { useUserContext } from './hooks/useUserContext'
import FiltersPage  from './pages/Filters/FiltersPage';
import SearchPage from './pages/SearchPage/SearchPage';
import UploadRecipePage from './pages/UploadRecipePage/UploadRecipePage';


function App() {
  const { user } = useUserContext()
  return (
 
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <Navbar className={styles.appNav}></Navbar>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={ <Home />} />
            {/* Specific routes should come before dynamic ones */}
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to = "/" />} />
            <Route path="/signup" element={!user ? <SignupPage />: <Navigate to = "/" />} />
            <Route path="/upload" element={user? <UploadRecipePage/> : <Navigate to = "/" />} />
            {/* Dynamic route for recipe, placed after specific ones */}
            <Route path="/:id" element={<RecipePage />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/search/:search" element={<SearchPage />} />
            <Route path="/:id" element={<RecipePage />} />
            <Route path="/filters" element={<FiltersPage />} />
            <Route path="/upload" element={<UploadRecipePage/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
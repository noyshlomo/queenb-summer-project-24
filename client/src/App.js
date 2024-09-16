import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import UserProfile from './pages/UserProfile/UserProfile';
import Navbar from './components/Navbar/Navbar';
import RecipePage from './pages/RecipePage/RecipePage';


function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src="/project-logo.png" alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
            <Link to="/profile/:userId" className={styles.appLink}>Profile</Link>
          </nav>
          <Navbar className={styles.appNav}></Navbar>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
          </Routes>
          <Routes>
            <Route path="/:id" element={<RecipePage/>} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

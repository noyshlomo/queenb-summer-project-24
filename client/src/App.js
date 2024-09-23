import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/HomePage/HomePage";
import styles from "./styles/App.module.css";
import UserProfile from "./pages/UserProfile/UserProfile";
import Navbar from "./components/Navbar/Navbar";
import RecipePage from "./pages/RecipePage/RecipePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import FiltersPage from "./pages/Filters/FiltersPage";


function App() {
  // const {user} = useUserContext();
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <Navbar className={styles.appNav}></Navbar>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
            <Route path="/search/:search" element={<SearchPage />} />
            <Route path="/:id" element={<RecipePage />} />
            <Route path="/filters" element={<FiltersPage />} />
          </Routes>
          <Routes>
            {/* <Route path="/:id" element={<RecipePage/>} /> */}
          </Routes>
          <Routes>
            <Route path="/upload" element={<UploadRecipePage/>} />
            {/* <Route path="/upload" element={user? <UploadRecipePage/> : <Navigate to = "/" />} /> */}
            {/* <Route path="/profile/:userId" element={<UserProfile />} /> */}
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


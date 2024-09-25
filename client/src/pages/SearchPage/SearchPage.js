import React from "react";
import DisplayFilteredRecipes from "../../components/DisplayFilteredRecipes/DisplayFilteredRecipes";
import { FiltersProvider } from "../../context/FiltersContext";
import Filters from "../../components/Filters/Filters";
import styles from "./SearchPage.module.css"; // Assuming you're using a CSS module

function SearchPage() {
  return (
    <FiltersProvider>
      <div className={styles.searchPageContainer}>
        <div className={styles.filtersSection}>
          <Filters />
        </div>
        <div className={styles.recipesSection}>
          <DisplayFilteredRecipes />
        </div>
      </div>
    </FiltersProvider>
  );
}

export default SearchPage;

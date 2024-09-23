import React from "react";
import styles from "./Filters.module.css";
import Filters from "../../components/Filters/Filters";
import { FiltersProvider } from "../../context/FiltersContext";

const FiltersPage = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Filters</h1>
      <FiltersProvider>
        <Filters />
      </FiltersProvider>
    </div>
  );
};

export default FiltersPage;

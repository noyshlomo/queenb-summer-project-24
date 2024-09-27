import React, { useContext, useEffect } from "react";
import { Stack } from "@mui/material";
import TagsFilter from "./TagsFilter/TagsFilter";
import PreparationStepsFilter from "./PreparationStepsFilter/PreparationStepsFilter";
import IngredientsFilter from "./IngredientsFilter/IngredientsFilter";
import SortComponent from "./SortComponent/SortComponent";
import { FiltersContext } from "../../context/FiltersContext";

const Filters = () => {
  const { recipes } = useContext(FiltersContext);

  useEffect(() => {
    console.log("Filtered Recipes:", recipes); // Print filtered recipes to the console
  }, [recipes]); // Run effect whenever recipes change

  return (
    <Stack spacing={2} sx={{ width: "100%", display: "inline-flex" }}>
      <SortComponent />
      <PreparationStepsFilter />
      <TagsFilter />
      <IngredientsFilter />
    </Stack>
  );
};

export default Filters;

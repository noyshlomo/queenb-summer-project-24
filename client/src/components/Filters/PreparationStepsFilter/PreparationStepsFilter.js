import { React, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import api from "../../../services/api";
import { FiltersContext } from "../../../context/FiltersContext";
import styles from "./PreparationStepsFilter.module.css";

function PreparationStepsFilter() {
  const { selectedMaxPrepSteps, setSelectedMaxPrepSteps } =
    useContext(FiltersContext);
  const [maxPrepSteps, setMaxPrepSteps] = useState(0);

  useEffect(() => {
    const fetchMaxPrepSteps = async () => {
      try {
        const response = await api.get("/recipe/getMaxPrepSteps");
        const maxSteps = response.data.maxPrepSteps;
        setMaxPrepSteps(maxSteps);
        setSelectedMaxPrepSteps(maxSteps); // Set the default to the max value
      } catch (error) {
        console.error("Error fetching max preparation steps:", error);
      }
    };

    fetchMaxPrepSteps();
  }, []);

  const handleMaxPrepStepChange = (event, value) => {
    setSelectedMaxPrepSteps(value);
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.typography} variant="body1">
        Max preparation steps:
      </Typography>
      <Slider
        className={styles.slider}
        size="small"
        aria-label="Max preparation steps"
        valueLabelDisplay="auto"
        value={selectedMaxPrepSteps}
        onChange={handleMaxPrepStepChange}
        max={maxPrepSteps}
      />
    </Box>
  );
}

export default PreparationStepsFilter;

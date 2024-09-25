import { React, useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import api from "../../../services/api";
import { FiltersContext } from "../../../context/FiltersContext";

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
    <Box sx={{ width: 280 }}>
      <Typography
        variant="body1"
        sx={{ color: "black", mb: 1, textAlign: "left" }}
      >
        Max preparation steps:
      </Typography>
      <Slider
        size="small"
        aria-label="Max preparation steps"
        valueLabelDisplay="auto"
        value={selectedMaxPrepSteps}
        onChange={handleMaxPrepStepChange}
        max={maxPrepSteps}
        sx={{
          color: "black",
          "& .MuiSlider-thumb": {
            borderRadius: "50%",
            border: "2px solid black",
          },
        }}
      />
    </Box>
  );
}

export default PreparationStepsFilter;

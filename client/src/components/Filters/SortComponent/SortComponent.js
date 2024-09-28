import { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FiltersContext } from "../../../context/FiltersContext";
import styles from "./SortComponent.module.css";

function SortComponent() {
  const options = [
    { value: 0, label: "-- select option --" },
    { value: 1, label: "New to old" },
    { value: 2, label: "Preparation time" },
  ];

  const [sortBy, setSortBy] = useState(options[0].value);
  const [isFocused, setIsFocused] = useState(false);
  const { setSortingMethod } = useContext(FiltersContext);

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    setSortingMethod(sortBy);
  }, [sortBy]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Box className={styles.wrapper}>
      <FormControl
        sx={{
          width: "100%",
          "& .MuiInputLabel-root": {
            color: isFocused ? "black" : "inherit",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
          },
        }}
        variant="outlined"
      >
        <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort by"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 200,
              },
            },
          }}
          sx={{ textAlign: "left", fontSize: "0.875rem" }}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                fontSize: "0.875rem",
                color:
                  option.value === 0 && sortBy === 0 ? "lightgray" : "inherit",
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SortComponent;

import React, { useState, useEffect, useContext } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { FiltersContext } from "../../../context/FiltersContext";
import api from "../../../services/api";

function TagsFilter() {
  const { selectedTags, setSelectedTags } = useContext(FiltersContext);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/recipe/getTags");
        setAvailableTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleTagsChange = (event, value) => {
    setSelectedTags(value); // Set selected tags to the updated list
  };

  return (
    <Stack spacing={3} sx={{ width: 280 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={availableTags}
        getOptionLabel={(tag) => tag}
        value={selectedTags}
        onChange={handleTagsChange} // Handle tag selection changes
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Filter by tags"
            placeholder="Select a tag..."
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "black", // Keep black on focus (click)
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "black", // Label color on focus
              },
            }}
          />
        )}
      />
    </Stack>
  );
}

export default TagsFilter;

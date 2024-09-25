import { React, useEffect, useState, Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SettingsIcon from "@mui/icons-material/Settings";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import ButtonBase from "@mui/material/ButtonBase";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import api from "../../../services/api";
import { FiltersContext } from "../../../context/FiltersContext";

const StyledPopper = styled(Popper)(({ theme }) => ({
  border: "1px solid #e1e4e8",
  boxShadow: "0 8px 24px rgba(149, 157, 165, 0.2)",
  color: "#24292e",
  backgroundColor: "#fff",
  borderRadius: 6,
  width: 300,
  zIndex: theme.zIndex.modal,
  fontSize: 13,
}));

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,
  width: "100%",
  borderBottom: "1px solid #30363d",
  "& input": {
    borderRadius: 4,
    backgroundColor: "#fff",
    border: "1px solid #30363d",
    padding: 8,
    fontSize: 14,
  },
}));

const Button = styled(ButtonBase)(({ theme }) => ({
  fontSize: 13,
  width: "100%",
  textAlign: "left",
  paddingBottom: 8,
  color: "#000", // Always stays black
  fontWeight: 600,
  "&:hover,&:focus": {
    color: "#000", // Keeps black color on click/hover
  },
  "& span": {
    width: "100%",
  },
  "& svg": {
    width: 16,
    height: 16,
  },
}));

function IngredientsFilter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [pendingValue, setPendingValue] = useState([]);
  const [availableIngredients, setAvailableIngredients] = useState([]);
  const { selectedIngredients, setSelectedIngredients } =
    useContext(FiltersContext);
  const theme = useTheme();

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await api.get("/recipe/getIngredients");
        setAvailableIngredients(response.data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setSelectedIngredients(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "ingredients-label" : undefined;

  return (
    <Fragment>
      <Box sx={{ width: 280, fontSize: 16 }}>
        <Button disableRipple aria-describedby={id} onClick={handleClick}>
          <span>Ingredients</span>
          <SettingsIcon />
        </Button>
        {selectedIngredients.map((ingredient) => (
          <Box
            key={ingredient}
            sx={{
              mt: "3px",
              height: 20,
              padding: ".15em 4px",
              fontWeight: 600,
              lineHeight: "15px",
              borderRadius: "2px",
              backgroundColor: "#b3613c", // Set ingredient background color
              color: theme.palette.getContrastText("#b3613c"),
            }}
          >
            {ingredient}
          </Box>
        ))}
      </Box>
      <StyledPopper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div>
            <Autocomplete
              open
              multiple
              value={pendingValue}
              onChange={(event, newValue) => {
                setPendingValue(newValue);
              }}
              disableCloseOnSelect
              renderTags={() => null}
              renderOption={(props, option, { selected }) => {
                const { key, ...rest } = props;
                return (
                  <li key={key} {...rest}>
                    <Box
                      component={DoneIcon}
                      sx={{ visibility: selected ? "visible" : "hidden" }}
                    />
                    <Box sx={{ flexGrow: 1, ml: 1 }}>{option}</Box>
                  </li>
                );
              }}
              options={availableIngredients}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <StyledInput
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  placeholder="Filter ingredients"
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </StyledPopper>
    </Fragment>
  );
}

export default IngredientsFilter;

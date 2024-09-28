import { React, useEffect, useState, Fragment, useContext } from "react";
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
import styles from "./IngredientsFilter.module.css";

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
      <Box className={styles.wrapper}>
        <ButtonBase
          className={styles.button}
          disableRipple
          aria-describedby={id}
          onClick={handleClick}
        >
          <span>Ingredients</span>
          <SettingsIcon />
        </ButtonBase>
        {selectedIngredients.map((ingredient) => (
          <Box className={styles.ingredientBox} key={ingredient}>
            {ingredient}
          </Box>
        ))}
      </Box>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        className={styles.popper}
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
                    <Box className={styles.option}>{option}</Box>
                  </li>
                );
              }}
              options={availableIngredients}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <InputBase
                  ref={params.InputProps.ref}
                  inputProps={params.inputProps}
                  placeholder="Filter ingredients"
                  className={styles.inputWrapper}
                />
              )}
            />
          </div>
        </ClickAwayListener>
      </Popper>
    </Fragment>
  );
}

export default IngredientsFilter;

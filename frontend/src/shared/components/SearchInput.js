import React from "react";
import PropTypes from "prop-types";

import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@material-ui/core/";
import SearchIcon from "@material-ui/icons/Search";

function SearchInput({ onClick, fullWidth }) {
  return (
    <FormControl variant="outlined" fullWidth={fullWidth}>
      <InputLabel htmlFor="search">Pesquisar</InputLabel>
      <OutlinedInput
        type="text"
        id="search"
        name="search"
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={onClick} edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        labelWidth={72}
      />
    </FormControl>
  );
}

SearchInput.propTypes = {
  onClick: PropTypes.func,
};

export default SearchInput;

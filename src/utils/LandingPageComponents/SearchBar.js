import React, { useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Books } from "context/Books";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchBar({ bookFilters, updateBookFilters, updateFilters }) {
  const updateSearchKey = (value) => {
    var escapeChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    if (!escapeChars.test(value)) {
      updateBookFilters({ search: value });
    }
  };const updateIfEnterKey = (e) => {
    if(e.charCode === 13) updateFilters()
  }
  return (
    <Search
      sx={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        flexShrink: 0,
        flex: 1,
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by Author, Title"
        sx={{ flexGrow: 1 }}
        value={bookFilters["search"] }
        onChange={(e) => updateSearchKey(e.target.value)}
        onKeyPress={(e)=>updateIfEnterKey(e)}
        inputProps={{ "aria-label": "search", style: { width: "100%" } }}
      />
    </Search>
  );
}

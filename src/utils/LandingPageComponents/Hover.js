import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import GenreFilters from "../../pages/Landing/GenreFilters";
import FilterList from "@mui/icons-material/FilterList";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import RatingFilter from "pages/Landing/RatingFilter";
import PriceFilter from "pages/Landing/PriceFilter";

export default function Hover({
  genres,
  isloading,
  updateBookFilters,
  price,
  bookFilters,
  rating,
  updateFilters,
}) {
  return (
    <PopupState
      variant="popper"
      popupId="demo-popup-popover"
      style={{
        display: "flex",
        alignItems: "center",
        flexBasis: "300px",
        flexShrink: 0,
      }}
    >
      {(popupState) => (
        <Box sx={{ marginRight: "24px !important" }}>
          <Button
            disabled={isloading}
            {...bindTrigger(popupState)}
            size="large"
            color="inherit"
            sx={{ paddingTop: "12px", paddingBottom: "12px" }}
            variant="outlined"
          >
            <Typography variant="subtitle1">Filters</Typography>
            <FilterList />
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Stack direction="column">
              <RatingFilter
                updateBookFilters={updateBookFilters}
                min={rating?.[0] || 0}
                max={rating?.[1] || 5}
                bookFilters={bookFilters}
              />
              <PriceFilter
                updateBookFilters={updateBookFilters}
                min={price?.[0] || 0}
                max={price?.[1] || 15}
                bookFilters={bookFilters}
              />
              <GenreFilters
                updateBookFilters={updateBookFilters}
                bookFilters={bookFilters}
                genres={genres}
              />
              <Button
                variant="contained"
                onClick={() => {
                  updateFilters();
                  popupState.close();
                }}
              >
                Apply Filters
              </Button>
            </Stack>
          </Popover>
        </Box>
      )}
    </PopupState>
  );
}

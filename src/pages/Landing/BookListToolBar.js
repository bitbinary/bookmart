import React, { useContext, useState } from 'react';
import { Box, Paper, Stack, Button } from '@mui/material';
import Hover from 'utils/LandingPageComponents/Hover';
import Sorter from 'utils/LandingPageComponents/Sorter';
import SearchBar from 'utils/LandingPageComponents/SearchBar';
import { Books } from 'context/Books';

export default function BookListToolBar({ isLoading, genres }) {
  const { updateFilters } = useContext(Books);
  const [bookFilters, setBookFilters] = useState({
    price: null,
    rating: null,
    genre: null,
    search: null,
    orderBy: null,
    ascending: null,
  });
  const updateBookFilters = (filter) => {
    setBookFilters({
      ...bookFilters,
      ...filter,
    });
  };
  console.log(bookFilters);
  return (
    <Paper elevation={8}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        bgcolor="#fdfdfd"
        sx={{ flexWrap: 'wrap' }}
        alignItems={{ xs: 'stretch', md: 'center' }}
        spacing={2}
      >
        <SearchBar
          keyword={null}
          updateBookFilters={updateBookFilters}
          bookFilters={bookFilters}
        />
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'space-between', md: 'flex-end' }}
        >
          <Sorter
            updateBookFilters={updateBookFilters}
            isloading={isLoading}
            sx={{ xs: { flexGrow: 1 }, md: { flexGrow: 0 } }}
          />
          <Hover
            bookFilters={bookFilters}
            isloading={isLoading}
            genres={genres}
            updateBookFilters={updateBookFilters}
          />
        </Stack>
      </Stack>
      <Box textAlign="right">
        <Button size="large" onClick={() => updateFilters(bookFilters)}>
          Apply Filters
        </Button>
      </Box>
    </Paper>
  );
}

import React, { useContext, useState } from 'react';
import { Box, Paper, Stack, Button } from '@mui/material';
import Hover from 'utils/LandingPageComponents/Hover';
import Sorter from 'utils/LandingPageComponents/Sorter';
import SearchBar from 'utils/LandingPageComponents/SearchBar';
import { Books } from 'context/Books';

export default function BookListToolBar({ isLoading, genres, price, rating }) {
   const { updateFilters,allBooksFilters: {search, genres: genreFilters, orderBy, price: priceFilter} } = useContext(Books);

   const [bookFilters, setBookFilters] = useState({
      price: null || priceFilter,
      rating: null || rating,
      genres: [] || genreFilters,
      search: null || search,
      orderBy: null || orderBy,
      ascending: null,
   });
   const updateBookFilters = (filter) => {
      setBookFilters({
         ...bookFilters,
         ...filter,
      });
   };
   const updatefilteringFilters = (filter) =>{
      updateFilters(filter||bookFilters)
   }
   return (
      <Box component={Paper} elevation={8}>
         <Stack
            direction={{ xs: 'column', md: 'row' }}
            sx={{ flexWrap: 'wrap' }}
            alignItems={{ xs: 'stretch', md: 'center' }}
            spacing={2}
         >
            <SearchBar
               keyword={null}
               updateBookFilters={updateBookFilters}
               bookFilters={bookFilters}
               updateFilters={updatefilteringFilters}
            />
            <Stack
               spacing={2}
               direction='row'
               alignItems='center'
               justifyContent={{ xs: 'space-between', md: 'flex-end' }}
            >
               <Sorter
                  updateBookFilters={updateBookFilters}
                  isloading={isLoading}
                  sx={{ xs: { flexGrow: 1 }, md: { flexGrow: 0 } }}
                  updateFilters={updatefilteringFilters}
               />
               <Hover
                  bookFilters={bookFilters}
                  isloading={isLoading}
                  genres={genres}
                  price={price}
                  rating={rating}
                  updateBookFilters={updateBookFilters}
                  updateFilters={updatefilteringFilters}
               />
            </Stack>
         </Stack>
      </Box>
   );
}

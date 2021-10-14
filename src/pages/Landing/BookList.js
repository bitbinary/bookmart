import React, { useContext } from 'react';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import BookListCard from './BookListCard';
import BookListCardSkeleton from './BookListCardSkeleton';
import SearchBar from '../../utils/LandingPageComponents/SearchBar';
import Hover from '../../utils/LandingPageComponents/Hover';
import Sorter from '../../utils/LandingPageComponents/Sorter';
import { Books } from '../../context/Books';

const BookList = ({
   books = [],
   genres = [],
   bookListTitle = 'carouselTitle',
   isLoading,
}) => {
   const { updateFilters, allBooksFilters } = useContext(Books);
   const setSearchValue = (value) => {
      updateFilters({ search: value });
   };
   return (
      <Box>
         {!isLoading ? (
            <Grid container justifyContent='center' alignContent='flex-start'>
               {books?.map((book) => {
                  return (
                     <Grid m={4} sx={{ display: 'flex' }} item key={book.isbn}>
                        <BookListCard key={book.isbn} cardData={book} />
                     </Grid>
                  );
               })}
            </Grid>
         ) : (
            <Grid container justifyContent='center'>
               {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20,
               ].map((book) => {
                  return (
                     <Grid m={4} item key={book}>
                        <BookListCardSkeleton cardData={book} />
                     </Grid>
                  );
               })}
            </Grid>
         )}
      </Box>
   );
};
export default BookList;

import React, { useState, useContext, useEffect } from 'react';
import BookList from './BookList';
import Pagination from '@mui/material/Pagination';
import { Books } from '../../context/Books';
import { useFetch } from '../../tools/hooks/useFetch';
import { toast } from 'react-toastify';
import { bottomStandard } from '../../configs/toastConfigs';
import SearchBar from 'utils/LandingPageComponents/SearchBar';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import Hover from 'utils/LandingPageComponents/Hover';
import Sorter from 'utils/LandingPageComponents/Sorter';
import { Box } from '@mui/system';
import BookListToolBar from './BookListToolBar';

export default function AllBooks() {
   const [pageNumber, setPageNumber] = useState(1);
   const resultsPerPage = 20;
   const numberOfPages = 1;
   const { allBooksFilters, AddToGenres } = useContext(Books);
   const { status, error, data } = useFetch('books/allbooks', {
      pageNumber: pageNumber,
      resultsPerPage: resultsPerPage,
      numberOfPages: numberOfPages,
      ...allBooksFilters,
   });
   const isLoading = !(status === 'fetched');
   const handlePageChange = (event, page) => {
      setPageNumber(page);
   };

   if (error) toast.error(`Failed to Register`, bottomStandard);
   useEffect(() => {
      if (data?.totalResults) {
         if (Math.ceil(data?.totalResults / resultsPerPage) < pageNumber)
            setPageNumber(1);
      }
      if (data?.genres) {
         AddToGenres(data?.genres);
      }
      return () => {};
   }, [data]);
   return (
      <Box>
         <Typography gutterBottom variant='h5' component='div'>
            All Books
         </Typography>

         <BookListToolBar
            genres={data?.genres}
            price={data?.price}
            rating={data?.rating}
         />
         <Divider sx={{ marginBottom: '16px ' }} />

         <BookList
            pageNumber={pageNumber}
            books={data?.books}
            genres={data?.genres}
            bookListTitle={'All Books'}
            isLoading={isLoading}
         />
         {data?.totalResults !== 0 && (
            <Pagination
               onChange={handlePageChange}
               page={pageNumber}
               defaultPage={1}
               count={Math.ceil(Number(data?.totalResults / resultsPerPage))}
               variant='outlined'
               shape='rounded'
            />
         )}
      </Box>
   );
}

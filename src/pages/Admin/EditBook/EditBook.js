import { Books } from 'context/Books';
import React, { useState, useContext, useEffect } from 'react';
import { useFetch } from 'tools/hooks/useFetch';
import EnhancedTable from './EnhancedTable';
import PageLoading from 'utils/shared/PageLoading';
import { Box } from '@mui/system';
import { Container } from '@mui/material';

export default function EditBook({ onUpdateSelection }) {
   const [pageNumber, setPageNumber] = useState(1);
   const resultsPerPage = 20;
   const numberOfPages = 1;
   const { allBooksFilters } = useContext(Books);
   const { data } = useFetch('books/allbooks', {
      pageNumber: pageNumber,
      resultsPerPage: 8637,
      numberOfPages: numberOfPages,
      ...allBooksFilters,
   });

   useEffect(() => {
      if (data?.totalResults) {
         if (Math.ceil(data?.totalResults / resultsPerPage) < pageNumber)
            setPageNumber(1);
      }

      return () => {};
   }, [data, pageNumber]);

   if (!data?.books)
      return <PageLoading displayMsg='Fetching book details ...' />;

   return (
      <Box
         sx={{
            display: 'flex',
            flexDirection: 'center',
            width: '100%',
         }}
      >
         <Container>
            <EnhancedTable
               onUpdateSelection={onUpdateSelection}
               Books={data?.books}
            />
         </Container>
      </Box>
   );
}

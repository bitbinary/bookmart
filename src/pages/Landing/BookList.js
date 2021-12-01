import { Box } from '@mui/system';

import Grid from '@mui/material/Grid';
import BookListCard from './BookListCard';
import BookListCardSkeleton from './BookListCardSkeleton';
import { Paper } from '@mui/material';

const BookList = ({
   books = [],
   genres = [],
   bookListTitle = 'carouselTitle',
   isLoading,
}) => {

   return (
      <Box>
         {!isLoading ? (
            <Grid container justifyContent='center' alignContent='flex-start'>
               {books?.map((book) => {
                  return (
                     <Grid  p={1} m={2} sx={{ display: 'flex' }} item key={book.isbn}>
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

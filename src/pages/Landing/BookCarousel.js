import React from 'react';
import { Box } from '@mui/system';
import Carousel from 'react-elastic-carousel';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import topsellers from '../../utils/LandingPageComponents/topbooks.json';
import BookListCard from './BookListCard';
import BookListCardSkeleton from './BookListCardSkeleton';
const breakPoints = [
   { width: 1, itemsToShow: 1 },
   { width: 550, itemsToShow: 2, itemsToScroll: 2 },
   { width: 768, itemsToShow: 4, itemsToScroll: 4 },
   { width: 1200, itemsToShow: 6 },
];
const loaderData = [
   { loading: true },
   { loading: true },
   { loading: true },
   { loading: true },
];
export default function BookCarousel({
   carouselData = [],
   isLoading,
   carouselTitle = 'carouselTitle',
}) {
   return (
      <Box>
         <Typography gutterBottom variant='h5' component='div' sx={{}}>
            {carouselTitle}
         </Typography>
         <Divider sx={{ marginBottom: '16px ' }} />
         {!isLoading ? (
            <Carousel breakPoints={breakPoints} pagination={false}>
               {carouselData?.map((book) => {
                  return (
                     <Grid
                        sx={{ display: 'flex', height: '100%' }}
                        item
                        key={book.isbn}
                     >
                        <BookListCard cardData={book} />
                     </Grid>
                  );
               })}
            </Carousel>
         ) : (
            <Carousel breakPoints={breakPoints} pagination={false}>
               {[
                  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                  19, 20,
               ].map((book) => {
                  return (
                     <Grid item key={book}>
                        <BookListCardSkeleton cardData={book} />
                     </Grid>
                  );
               })}
            </Carousel>
         )}
      </Box>
   );
}

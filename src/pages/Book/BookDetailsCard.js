import { Grid, Rating, Typography } from '@mui/material';
import { auth } from 'configs/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useFetch } from 'tools/hooks/useFetch';
import BookPurchase from './BookPurchase';

export default function BookDetailsCard({ details }) {
   const {
      title,
      authors,
      isPurchased,
      isCarted,
      rating,
      price,
      currency,
      currencySymbol,
      isbn,
      id,
      genre,
      language,
      numberOfPages,
      userFeelings,
      synopsis,
   } = details;

   const [user] = useAuthState(auth);
   const token = user.accessToken;
   const { status, error, data } = useFetch('books/getBookById', {
      isbn,
   });

   return (
      <>
         <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={10}>
               <>
                  <Typography variant='h6' gutterBottom component='div'>
                     {title}
                  </Typography>
                  <Typography variant='subtitle1' gutterBottom component='div'>
                     Written by: {authors.map((author) => author)}
                  </Typography>
                  <Typography variant='subtitle2' gutterBottom component='div'>
                     <Rating
                        name='half-rating-read'
                        defaultValue={rating}
                        precision={0.5}
                        readOnly
                     />
                  </Typography>
                  <Typography variant='subtitle2' gutterBottom component='div'>
                     ISBN: {isbn}
                  </Typography>
                  <Typography variant='subtitle2' gutterBottom component='div'>
                     Languages: {language.map((lang) => lang)}
                  </Typography>
                  <Typography variant='subtitle2' gutterBottom component='div'>
                     Genre: {genre}
                  </Typography>
                  <Typography variant='subtitle2' gutterBottom component='div'>
                     Number of pages: {numberOfPages}
                  </Typography>
               </>
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
               <BookPurchase
                  price={price}
                  currency={currency}
                  currencySymbol={currencySymbol}
                  isPurchased={isPurchased}
                  isCarted={isCarted}
               />
            </Grid>
         </Grid>
         <Typography variant='subtitle2' gutterBottom component='div'>
            Synopsis:
            {synopsis.map((synop, index) => (
               <Typography
                  key={index}
                  variant='body2'
                  gutterBottom
                  component='div'
               >
                  {synop}
               </Typography>
            ))}
         </Typography>
      </>
   );
}

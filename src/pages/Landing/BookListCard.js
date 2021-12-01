import React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { CardContent, Typography, Rating } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Image from 'utils/shared/Image';
import { Box } from '@mui/system';

export default function BookListCard({ cardData }) {
   const {
      isbn,
      title,
      author,
      bookimage,
      rating,
      price,
   } = cardData;

   return (
      <Stack direction='column' gap={1}>
         <Card elevation={3} component={Box} key={isbn} className='book' sx={{ flexGrow: 1, width: '200px' }}>
            <CardContent
               sx={{
                  padding: '0px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
               }}
            >
               <Image
                  key={isbn}
                  className='bookFront'
                  component='img'
                  imagePath={bookimage}
                  alt={title}
               />
            </CardContent>
            <CardContent
               className='bookBack'
               style={{
                  display: 'flex',
                  flexFlow: 'column',
               }}
            >
               <div style={{ flexGrow: 1 }}>
                  <Stack spacer={2}>
                     {' '}
                     <Typography
                        sx={{ fontStyle: 'italic' }}
                        variant='subtitle1'
                     >
                        <strong>Title: </strong> {title}
                     </Typography>
                     <Typography
                        sx={{ fontStyle: 'italic' }}
                        variant='subtitle1'
                     >
                        <strong>Author: </strong> {author}
                     </Typography>
                  </Stack>
               </div>
               <Button
                  component={Link}
                  to={`/book/${isbn}`}
                  size='large'
                  aria-label='View Book details'
                  variant='contained'
                  color='primary'
               >
                  View More
               </Button>
            </CardContent>
         </Card>
         <Rating
            name='half-rating-read'
            defaultValue={rating}
            precision={0.5}
            readOnly
         />
         <Typography variant='subtitle1'>
            Price:
            {new Intl.NumberFormat('en-AU', {
               style: 'currency',
               currency: 'AUD',
            }).format(price)}
         </Typography>
      </Stack>
   );
}

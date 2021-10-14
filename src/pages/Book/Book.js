import React from 'react';
import { Box, styled } from '@mui/system';
import { Container, Grid, Paper } from '@mui/material';
import Image from '../../utils/shared/Image';
import BookDetailsCard from './BookDetailsCard';
import Reviews from '../../utils/Reviews/Reviews';
import { useParams } from 'react-router';
import { useFetch } from '../../tools/hooks/useFetch';
const Item = styled(Paper)(({ theme }) => ({
   ...theme.typography.body2,
   padding: theme.spacing(2),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));
const bookData = {
   title: 'Harry Potter and the Prizoner of Azkaban',
   authors: ['JK Rowling'],
   isPurchased: true,
   isCarted: true,
   genre: 'Fiction',
   bookImage:
      'https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher_170w/public/product-images/csm-movie/harry-potter-and-the-prisoner-of-azkaban-poster.jpg?itok=iOK-rCAn',
   rating: 4.5,
   price: 20,
   currency: 'AUD',
   currencySymbol: '$',
   ISBN: '12312321b123',
   id: '12312312asdsdad',
   language: ['English'],
   numberOfPages: 456,
   userFeelings: [
      {
         feeling: 'thrilled',
         feelId: 2,
         numberOfPeople: 12,
      },
      {
         feeling: 'sad',
         feelId: 6,
         numberOfPeople: 4,
      },
   ],
   synopsis: [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,',
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,',
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,',
   ],
};

export default function Book() {
   const { id } = useParams();
   const { status, error, data } = useFetch('books', { id });
   return (
      <Box
         sx={{
            display: 'flex',
            flexGrow: 1,
            flexShrink: 0,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
         }}
      >
         <Container maxWidth='lg'>
            <Grid
               p={1}
               container
               spacing={2}
               justifyContent='space-between'
               display='flex'
            >
               <Grid item xs={12} sm={3} md={3}>
                  <Item>
                     <Image
                        imagePath={bookData.bookImage}
                        alt={bookData.title}
                     />
                  </Item>
               </Grid>
               <Grid display='flex' item xs={12} sm={9} md={9}>
                  <Item sx={{ textAlign: 'left', flexGrow: 1 }}>
                     <BookDetailsCard details={bookData} />
                  </Item>
               </Grid>
            </Grid>
            <Grid p={1} container spacing={2}>
               <Grid item xs={12} sm={12} md={12}>
                  <Reviews bookId={123123} />
               </Grid>
            </Grid>
         </Container>
      </Box>
   );
}

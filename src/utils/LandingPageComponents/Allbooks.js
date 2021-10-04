import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Carousel from 'react-elastic-carousel';
import topbooks from './topbooks.json';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import wild from './wild.jpg';
import SkeletonElement from './SkeletonElement';
import Sorter from './Sorter';

import Grid from '@mui/material/Grid';
import Hover from './Hover';
import SearchBar from './SearchBar';

export default function Allbooks() {
   const [books, setBooks] = useState(false);
   const [input, setInput] = useState('');
   useEffect(() => {
      setTimeout(async () => {
         await setBooks(topbooks);
      }, 1000);
      console.log(books);
   }, [input]);

   return (
      <Box
         className='all-books-container'
         sx={{
            // backgroundColor: '#25172A',

            flex: '2',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',

            // color: 'white',
         }}
      >
         {' '}
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
            }}
         >
            <Typography
               className='all-books'
               gutterBottom
               variant='h5'
               component='div'
               sx={{
                  fontFamily: 'Poynter,Georgia,serif',
                  fontStyle: 'italic',
               }}
            >
               Books
            </Typography>
            <div
               style={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
               }}
            >
               <SearchBar keyword={input} setKeyword={setInput} />
               <Hover />
               <Sorter />
            </div>
         </Box>
         <Box className='all-books-wrapper' sx={{ flexGrow: 1, padding: '1%' }}>
            <Grid
               container
               spacing={{ xs: 2, md: 3 }}
               columns={{ xs: 2, sm: 8, md: 12 }}
            >
               {books &&
                  books
                     .filter((book) => {
                        return (
                           book.author
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toString().toLowerCase()) > -1 ||
                           book.title
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toString().toLowerCase()) > -1
                        );
                     })
                     .map((book) => {
                        return (
                           <Grid
                              item
                              xs={2}
                              sm={4}
                              md={2}
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'center',
                                 justifyContent: 'space-between',
                              }}
                           >
                              <Box sxx={{ backgroundColor: '#5E1F80' }}>
                                 <CardActionArea
                                    sx={{
                                       display: 'flex',
                                       flexDirection: 'column',
                                       alignItems: 'center',
                                       justifyContent: 'space-between',
                                    }}
                                 >
                                    <CardMedia
                                       sx={{
                                          width: '157px',
                                          height: '239px',
                                       }}
                                       component='img'
                                       image={wild}
                                       alt='wild'
                                    />
                                    <div
                                       style={{
                                          textAlign: 'center',
                                          marginTop: '.8rem',
                                          minHeight: '45px',
                                       }}
                                    >
                                       <Typography
                                          sx={{
                                             fontFamily:
                                                'Poynter,Georgia,serif',
                                             fontSize: '16px',
                                             overflow: 'hidden',
                                             lineHeight: '1.3rem',
                                             maxHeight: '2.6rem',
                                          }}
                                       >
                                          {book.title}
                                       </Typography>
                                    </div>

                                    <Typography
                                       gutterBottom
                                       sx={{
                                          fontSize: 14,
                                          textDecoration: 'underline',
                                       }}
                                    >
                                       {book.author}
                                    </Typography>
                                 </CardActionArea>
                              </Box>
                              <div>
                                 <Typography
                                    sx={{ mb: 1.5, textAlign: 'center' }}
                                    color='text.primary'
                                 >
                                    {book.price}
                                 </Typography>
                                 <CardActions>
                                    <Button size='small'>View</Button>
                                    <Button size='small'>Add to cart</Button>
                                 </CardActions>
                              </div>
                           </Grid>
                        );
                     })}
               {!books &&
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(() => {
                     return <SkeletonElement />;
                  })}
            </Grid>
         </Box>
      </Box>
   );
}

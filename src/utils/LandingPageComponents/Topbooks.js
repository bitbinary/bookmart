import React, { useEffect, useState } from 'react';
import { Box, getThemeProps } from '@mui/system';
import Carousel from 'react-elastic-carousel';
// import topbooks from './topbooks.json';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';

// import wild from './wild.jpg';
// import viewed from './viewed.png';

// import recommand from './recommand.png';
// import best from './best.png';

import SkeletonElement from './SkeletonElement';

const breakPoints = [
   { width: 1, itemsToShow: 1 },
   { width: 550, itemsToShow: 2, itemsToScroll: 2 },
   { width: 768, itemsToShow: 4, itemsToScroll: 4 },
   { width: 1200, itemsToShow: 6 },
];

export default function Topbooks(props) {
   const l = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
   const { books, title, image } = props;
   const [top, setTop] = useState(false);

   useEffect(() => {
      setTimeout(async () => {
         await setTop(books);
      }, 1000);
   });
   return (
      <Box
         className='top-books-container'
         sx={{
            // backgroundColor: '#DBC249',

            flex: '2',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            borderBottom: '1px solid #ccc',
            padding: '1rem',
         }}
      >
         {' '}
         <Typography
            gutterBottom
            variant='h5'
            component='div'
            sx={{ fontFamily: 'Poynter,Georgia,serif', fontStyle: 'italic' }}
         >
            {title}
         </Typography>
         <Box
            className='top-books-wrapper'
            sx={{
               display: 'flex',
               justifyContent: 'space-around',
               //  alignItems: 'center',
            }}
         >
            {top && (
               <Carousel breakPoints={breakPoints}>
                  {top.map((book) => {
                     return (
                        <Card
                           className='top-books-card'
                           sx={{
                              maxWidth: 300,
                           }}
                        >
                           <CardActionArea
                              sx={{
                                 display: 'flex',
                                 flexDirection: 'column',
                              }}
                           >
                              <CardMedia
                                 sx={{ width: '157px', height: '239px' }}
                                 component='img'
                                 image={image}
                                 alt='wild'
                              />
                              <div
                                 className='quick-add'
                                 style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                 }}
                              >
                                 {' '}
                                 <Button
                                    size='small'
                                    style={{
                                       color: '#FFFFFF',
                                    }}
                                 >
                                    Quick add
                                 </Button>
                              </div>
                              {/* <CardContent>
                                 <Typography
                                    className='title'
                                    gutterBottom
                                    variant='h5'
                                    component='div'
                                 >
                                    {book.title}
                                 </Typography>
                                 <Typography
                                    style={{ textDecoration: 'underline' }}
                                    gutterBottom
                                    variant='h6'
                                    component='div'
                                 >
                                    {book.author}
                                 </Typography>
                                 <Typography
                                    gutterBottom
                                    variant='h6'
                                    component='div'
                                 >
                                    {book.price}
                                 </Typography>
                              </CardContent> */}
                           </CardActionArea>
                        </Card>
                     );
                  })}
               </Carousel>
            )}
            {!top &&
               [1, 2, 3, 4, 5].map(() => {
                  return <SkeletonElement />;
               })}
         </Box>
      </Box>
   );
}

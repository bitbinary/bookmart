import { Grid,  Skeleton, Typography } from '@mui/material';
import React from 'react';
function TypographySkeleton({variant, width,children, ...rest}) {
    return (
      <Typography {...rest} component="div" key={variant} variant={variant} flex>
        {children }<Skeleton width={width?width:'100%'} />
      </Typography>
    );
  }
export default function BookDetailsSkeleton() {
   
   return (
      <>
         <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={10}>
               <>
                  <TypographySkeleton variant='h6' gutterBottom component='div'>

                  </TypographySkeleton>
                  <TypographySkeleton variant='subtitle1' gutterBottom component='div'>
                     Written by:
                  </TypographySkeleton>
                  <TypographySkeleton variant='subtitle2' gutterBottom component='div'>
                 
                  </TypographySkeleton>
                  <TypographySkeleton variant='subtitle2' gutterBottom component='div'>
                     ISBN: 
                  </TypographySkeleton>
                  <TypographySkeleton variant='subtitle2' gutterBottom component='div'>
                     Languages: 
                  </TypographySkeleton>
                  <TypographySkeleton variant='subtitle2' gutterBottom component='div'>
                     Genre: 
                  </TypographySkeleton>
                  <TypographySkeleton variant='subtitle2' gutterBottom component='div'>
                     Number of pages: 
                  </TypographySkeleton>
               </>
            </Grid>
           
         </Grid>
         <TypographySkeleton variant='subtitle2' gutterBottom component='div'>
            Synopsis:
         </TypographySkeleton>
      </>
   );
}

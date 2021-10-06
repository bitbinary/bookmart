import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import bookMart from '../LandingPageComponents/bookMart.gif';
export default function PageLoading() {
   return (
      <Box
         sx={{
            display: 'flex',
            backgroundColor: '#fdfdfd',
            flexGrow: 1,
            flexShrink: 0,
            flexFlow: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
         }}
      >
         {/* Loading Page
         <LinearProgress sx={{ width: '300px' }} /> */}
         <img src={bookMart} />
      </Box>
   );
}

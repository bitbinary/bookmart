import { Box } from '@mui/system';
import React from 'react';
import bookMart from '../../assets/bookMart.gif';
export default function PageLoading() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        flexShrink: 0,
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >

      <img src={bookMart} alt="Book mart" />
    </Box>
  );
}

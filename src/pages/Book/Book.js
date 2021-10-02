import React from 'react';
import { Box } from '@mui/system';

export default function Book() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Book Page
    </Box>
  );
}

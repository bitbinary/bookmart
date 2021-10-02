import React from 'react';
import { Box } from '@mui/system';

export default function Book() {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#fdfdfd',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      Book Page
    </Box>
  );
}

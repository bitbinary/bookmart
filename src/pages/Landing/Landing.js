import React from 'react';
import { Box } from '@mui/system';
import Topbooks from '../../utils/LandingPageComponents/Topbooks';
import Allbooks from '../../utils/LandingPageComponents/Allbooks';
import topbooks from '../../utils/LandingPageComponents/topbooks.json';

export default function Landing() {
   return (
      <Box
         className='e-container'
         sx={{ height: '95vh', width: '100%', display: 'flex' }}
      >
         <Box
            className='e-wrapper'
            sx={{
               width: '100%',
               display: 'flex',
               flexDirection: 'column',
            }}
         >
            <Topbooks books={topbooks} />
            <Allbooks />
         </Box>
      </Box>
   );
}

import React from 'react';
import topbooks from '../../utils/LandingPageComponents/topbooks.json';
import { Box } from '@mui/system';
import Topbooks from '../../utils/LandingPageComponents/Topbooks';
import Allbooks from '../../utils/LandingPageComponents/Allbooks';
import viewed from '../../utils/LandingPageComponents/viewed.png';

import recommand from '../../utils/LandingPageComponents/recommand.png';
import best from '../../utils/LandingPageComponents/best.png';

export default function AuthenticatedLanding() {
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
            <Topbooks
               books={topbooks}
               title={'Recently Viewed'}
               image={viewed}
            />
            <Topbooks
               books={topbooks}
               title={'Recommended Books'}
               image={recommand}
            />

            <Topbooks books={topbooks} title={'Best Sellers'} image={best} />
            <Allbooks />
         </Box>
      </Box>
   );
}

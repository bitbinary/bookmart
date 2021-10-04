import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function SkeletonElement({ type }) {
   const classes = `skeleton ${type}`;
   return (
      <Stack
         spacing={1}
         style={{
            padding: '1%',
            flex: '22.222%',
            display: 'flex',

            alignItems: 'center',
         }}
      >
         <Skeleton variant='square' width={100} height={100} />
         <Skeleton variant='text' width={100} />
         <Skeleton variant='text' width={100} />
         <Skeleton variant='text' width={100} />
         <Skeleton variant='text' width={100} />
      </Stack>
   );
}

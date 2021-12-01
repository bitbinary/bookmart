import { Paper, Typography } from '@mui/material';
import {  Box } from '@mui/system'
import React from 'react'
import noresults from '../../assets/noresults.png';

export default function EmptyData({emptyText = 'No Results'}) {
    return (
        <Box component={Paper} elevation={2} p={2} sx={{flexGrow:1,    
            alignItems: 'center',
            justifyContent: 'center',
            display: "flex",
            flexDirection:'column',

            }}>
             <img style={{height:"100px", aspectRatio:1}} src={noresults} alt="No Results" />
             <Typography  mt={2} variant="body1">{emptyText}</Typography>
        </Box>
    )
}

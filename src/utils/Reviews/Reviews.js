import { Badge, Grid, Paper, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import Review from './Review';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const reviewsData = {
  reviews: [
    {
      id: 123123,
      userName: 'Srikaanth Bai',
      userImage:
        'https://media-exp1.licdn.com/dms/image/D5635AQFCxwtlETa85w/profile-framedphoto-shrink_200_200/0/1632889105802?e=1633251600&v=beta&t=QIGy-kgHKbU8V_Qs5f5fxdATTny7pvRhzLS_N8C_x4M',
      reviewText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      rating: 4.5,
      hasSpoiler: true,
      reviewSentiment: 'positive',
      userFeelings: [
        {
          feeling: 'thrilled',
          feelId: 2,
        },
        {
          feeling: 'happy',
          feelId: 2,
        },
      ],
    },
    {
      id: 12123,
      userName: 'Srik Raja',
      userImage:
        'https://media-exp1.licdn.com/dms/image/D5635AQFCxwtlETa85w/profile-framedphoto-shrink_200_200/0/1632889105802?e=1633251600&v=beta&t=QIGy-kgHKbU8V_Qs5f5fxdATTny7pvRhzLS_N8C_x4M',
      reviewText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      rating: 3.5,
      hasSpoiler: false,
      reviewSentiment: 'neutral',
      userFeelings: [
        {
          feeling: 'happy',
          feelId: 1,
        },
      ],
    },
    {
      id: 127823,
      userName: 'Kamal Bhai',
      userImage:
        'https://media-exp1.licdn.com/dms/image/D5635AQE9TquukXmq6w/profile-framedphoto-shrink_200_200/0/1630922901712?e=1633251600&v=beta&t=gIwx0GyBsK4Yy3_Odmkz1_uMiB-OmZJfOzwQnZYaqVk',
      reviewText:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      rating: 2,
      hasSpoiler: false,
      reviewSentiment: 'negative',
      userFeelings: [
        {
          feeling: 'sad',
          feelId: 4,
        },
      ],
    },
  ],
};
export default function Reviews() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
      }}
    >
      <Grid container xs={12}>
        <Grid item>
          <Typography variant="h4" component="div" gutterBottom>
            Reviews
          </Typography>
        </Grid>{' '}
      </Grid>
      <Grid container xs={12}>
        {reviewsData['reviews'].map((review) => (
          <Grid mb={1} item xs={12}>
            <Review review={review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

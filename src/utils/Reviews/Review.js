import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { Component } from 'react';
import Emotings from '../Emotings';

export default function Review({ review }) {
  const sentimentColors = {
    positive: 'green',
    neutral: 'gray',
    negative: 'red',
  };
  const {
    id,
    userName,
    reviewText,
    userImage,
    rating,
    hasSpoiler,
    reviewSentiment,
    userFeelings,
  } = review;
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={userImage}
        alt="Live from space album cover"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Grid container xs={12}>
            <Grid item xs={12}>
              <Typography component="div" variant="subtitle2">
                {userName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={4}>
                <Rating
                  name="half-rating-read"
                  defaultValue={rating}
                  precision={0.5}
                  readOnly
                />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography component="div" variant="body2"></Typography>
                  {userFeelings?.map(({ feeling, id }) => (
                    <Emotings variant={feeling} id={id} />
                  ))}
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              {hasSpoiler && (
                <Chip
                  sx={{ marginRight: 1 }}
                  size="small"
                  color="warning"
                  label="Has Spoiler"
                />
              )}
              {reviewSentiment && (
                <Chip size="small" color="secondary" label={reviewSentiment} />
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
              >
                {reviewText}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
}

import { Button, Grid, Paper, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "utils/shared/Image";

export default function MyCartBook({ bookDetails, handleCartRemove, index }) {
  const {
    isbn,
    title,
    author,
    bookimage,
    // numpages,
    rating,
    price,
  } = bookDetails;
  return (
    <Paper elevation={2} component="div">
      <Grid container gap={3}>
        <Grid minHeight="150px" width="150px" item>
          <Image
            style={{ width: "150px" }}
            alt={title}
            imagePath={bookimage}
          />
        </Grid>
        <Grid item display="flex" justifyContent="space-between" alignItems="center" flexGrow={1}>
          <Stack>
            <Typography variant="subtitle1"> <strong>Title:</strong> {title}</Typography>
            <Typography variant="subtitle1"> <strong>Author:</strong> {author}</Typography>
            <Rating
              name="half-rating-read"
              defaultValue={rating}
              precision={0.5}
              readOnly
            />
            <Typography variant="subtitle1"> <strong>ISBN:</strong> {isbn}</Typography>
          </Stack>
          <Stack mr={2}>
            <Typography variant="subtitle1"> <strong>Price:</strong>$ {price.toFixed(2)}</Typography>
              <Button onClick={()=>handleCartRemove(index)} variant="contained">Remove</Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

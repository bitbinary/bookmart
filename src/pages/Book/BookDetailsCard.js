import { Chip, Grid, Rating, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Emotings from "utils/Emotings";
import BookPurchase from "./BookPurchase";

export default function BookDetailsCard({ bookData, isAuthenticated }) {
  const {
    author,
    // bookurl,
    genre,
    isbn,
    language,
    numpages,
    price,
    publicationyear,
    rating,
    synopsis,
    title,
    emotings,
    ispurchased = false,
    iscarted = false,
    currency = "$AUD",
    currencySymbol = "$",
  } = bookData;
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={10}>
          <>
            <Typography variant="h6" gutterBottom component="div">
              {title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="div">
              Written by: {author}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              <Rating
                name="half-rating-read"
                defaultValue={rating}
                precision={0.5}
                readOnly
              />
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              ISBN: {isbn}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              Languages: {language}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              Genre: {genre}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              Number of pages: {numpages}
            </Typography>
            <Typography variant="subtitle2" gutterBottom component="div">
              Publication Year: {publicationyear}
            </Typography>
            <Stack gap={2}  direction="row" flexWrap="wrap">
            <Typography variant="subtitle2" gutterBottom component="div">
              Emotings: {Object.keys(emotings).length===0?"No Emotings yet": null}
            </Typography>
              {Object.keys(emotings)?.map((emotion) => {
                return emotion ? (
                  <Box display="flex" alignItems="center" flexDirection="column">
                    <Emotings variant={emotion} key={emotion} />
                    <Chip label={emotings[emotion] }/>
                  </Box>
                ) : null;
              })}
            </Stack>
          </>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <BookPurchase
            isAuthenticated={isAuthenticated}
            price={price}
            currency={currency}
            currencySymbol={currencySymbol}
            isPurchased={ispurchased}
            isCarted={iscarted}
            isbn={isbn}
          />
        </Grid>
      </Grid>
      <Typography variant="subtitle2" gutterBottom component="div">
        Synopsis:
        {synopsis.map((synop, index) => (
          <Typography key={index} variant="body2" gutterBottom component="div">
            {synop}
          </Typography>
        ))}
      </Typography>
    </>
  );
}

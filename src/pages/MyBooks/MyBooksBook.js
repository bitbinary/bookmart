import { Button, Grid, Paper, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import Image from "utils/shared/Image";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function MyBooksBook({ bookDetails }) {
  const {
    isbn,
    title,
    author,
    bookimage,
    rating,
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
          <Stack mr={2} gap={1}>
            <Button
              component={Link}
              to={`/book/${isbn}`}
              size='large'
              aria-label='View Book Details'
              variant='contained'
              color='primary'
            >  View Details
            </Button>
            <Button
              component={Link}
              to={`/readbook/${isbn}`}
              size='large'
              aria-label='Read Book'
              variant="contained"
              color="primary"
              sx={{
                display: "inline-flex",
                justifyContent: "center",
                alighItems: "center",
              }}
              startIcon={<VisibilityIcon />}
            >
              Read Book
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

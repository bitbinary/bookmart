import {
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Emotings from "../Emotings";
import "./Review.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
export default function Review({ review }) {
  const sentimentColors = {
    Positive: "#41b141",
    Neutral: "#8a8799",
    Negative: "#dd4d4d",
  };
  const {
    emotings,
    is_spoiler,
    rating,
    review_text,
    sentiment_label,
    user_name = "Default User Name",
  } = review;
  const [viewReviewText, setViewReviewText] = useState(!is_spoiler);
  let emotingsArray = emotings;
  if (typeof emotings === "string") {
    emotingsArray = [emotings];
  }
  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width:'100%' }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Grid spacing={2} container>
            <Grid item xs={12}>
              <Typography component="div" variant="subtitle2">
                {user_name}
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
                <Stack
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                  spacing={1}
                >
                  <Typography component="div" variant="body2"></Typography>
                  {emotingsArray?.map(
                    (emotion, index) =>
                      emotion && <Emotings variant={emotion} key={index} />
                  )}
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" gap={1}>
                {sentiment_label && (
                  <Chip
                    size="small"
                    sx={{
                      backgroundColor: sentimentColors[sentiment_label],
                      color: "white",
                    }}
                    label={sentiment_label}
                  />
                )}
                {is_spoiler && (
                  <Chip
                    sx={{ marginRight: 1 }}
                    size="small"
                    variant="outlined"
                    color="info"
                    label="Has Spoiler"
                  />
                )}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="div"
                className={viewReviewText ? "" : "bluredText"}
              >
                {review_text}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        {is_spoiler && (
          <Button
            onClick={() => setViewReviewText(!viewReviewText)}
            color="primary"
            aria-label="Review Text visibility"
            startIcon={
              !viewReviewText ? <VisibilityIcon /> : <VisibilityOffIcon />
            }
          >
            {!viewReviewText ? "View" : "Hide"}
          </Button>
        )}
      </Box>
    </Card>
  );
}

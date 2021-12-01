import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Rating,
  Select,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Review from "./Review";
import StarIcon from "@mui/icons-material/Star";
import Emotings from "utils/Emotings";
import { postRequest } from "tools/apiHelper";
import { toast } from "react-toastify";
import EmptyData from "utils/shared/EmptyData";
import { bottomStandard } from "configs/toastConfigs";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
const emotionsList = [
  "Euphoric",
  "Happy",
  "Funny",
  "Thrilled",
  "Bored",
  "Angry",
  "Sad",
  "Depressed",
];

export default function Reviews({
  reviewsData,
  updateFilters,
  filters = {},
  bookId,
  fetchReviews,
  isAuthenticated,
}) {
  const { reviews, alreadyReviewed } = reviewsData;
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [rating, setRating] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [reviewText, setReviewText] = React.useState("");
  const [emotions, setEmotions] = React.useState(() => []);
  const [isSpoiler, setIsSpoiler] = React.useState(false);
  const handleReviewEmotions = (event, newEmotions) => {
    setEmotions(newEmotions);
  };
  const handleReviewModalOpen = () => {
    setReviewModalOpen(true);
  };
  const handleReviewModalClose = () => {
    setReviewModalOpen(false);
  };
  const handleReviewModalSubmit = async () => {
    toast("Submitting Review");
    const result = await postRequest(`reviews/${bookId}`, {
      review_text: reviewText,
      emotings: emotions,
      rating,
      is_spoiler: isSpoiler,
    });

    if (result.status === 200) {
      setTimeout(() => {
        toast("Sucessfully added Review", bottomStandard);
        fetchReviews();
      }, 3000);
    }else{
      toast.error("Failed to add Review",bottomStandard);
    }
    setReviewModalOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      <Grid mb={3} spacing={1} alignItems="center" container>
        <Grid flexGrow={1} item>
          <Typography variant="h4" component="div" gutterBottom>
            Reviews
          </Typography>
        </Grid>
          {isAuthenticated && <Grid item p={0}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="sentiment-filter-select-label">
                Sentiment
              </InputLabel>
              <Select
                labelId="sentiment-filter-select-label"
                id="sentiment-filter-select"
                value={filters?.sentiment || ""}
                label="Sentiment"
                onChange={(e) => updateFilters({ sentiment: e.target.value })}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Positive"}>Positive</MenuItem>
                <MenuItem value={"Negative"}>Negative</MenuItem>
                <MenuItem value={"Neutral"}>Neutral</MenuItem>
              </Select>
            </FormControl>
          </Grid>}
        {isAuthenticated && <Grid item>
          <Button
            onClick={handleReviewModalOpen}
            variant="contained"
            color="primary"
            disabled={alreadyReviewed}
          >
            {alreadyReviewed ? "Reviewed" : "Write a Review"}
          </Button>
        </Grid>}
      </Grid>
      <Grid flexDirection="column-reverse" container gap={3}>
        {reviews.length > 0 &&
          reviews.map((review, index) => (
            <Grid component={Paper} elevation={2} key={review?.user_id || index} item xs={12}>
              <Review review={review} />
            </Grid>
          ))}
        {reviews.length === 0 && <EmptyData />}
      </Grid>
      {isAuthenticated && <Modal
        sx={{
          display: "grid",
          placeContent: "center",
        }}
        open={reviewModalOpen}
        onClose={handleReviewModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component={Paper}
          p={2}
          sx={{
            overflow: "auto",
          }}
        >
          <Grid container direction="column" gap={1}>
            <Typography
              mb={3}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Write A Review
            </Typography>
            <Grid mb={3} item>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                How satisfied are you with the book?*
              </Typography>
              <Grid m={2} display="flex">
                <Rating
                  name="hover-feedback"
                  key={rating}
                  value={rating}
                  precision={0.5}
                  size={"large"}
                  onChange={(event) => {
                    setRating(Number(event.target.value));
                  }}
                  onChangeActive={(event) => {
                    setHover(Number(event.target.value));
                  }}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {rating !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : rating]}
                  </Box>
                )}
              </Grid>
            </Grid>
            <Grid mb={3} item>
              <Typography mt={4} id="modal-modal-description" sx={{ mt: 2 }}>
                How did the book make you feel?
              </Typography>
              <ToggleButtonGroup
                value={emotions}
                onChange={handleReviewEmotions}
                aria-label="device"
                sx={{ flexWrap: "wrap" }}
              >
                {emotionsList.map((emotion) => (
                  <ToggleButton
                    key={emotion}
                    color="primary"
                    value={emotion}
                    aria-label={emotion}
                  >
                    <Emotings variant={emotion} id="emotion" />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>

            <Grid mb={3} item>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Review Comment
              </Typography>
              <TextField
                id="outlined-multiline-static"
                fullWidth
                multiline
                onChange={(e) => setReviewText(e.target.value)}
                value={reviewText}
                rows={4}
              />
            </Grid>
            <Grid mb={3} item>
              <FormGroup>
                <FormControlLabel
                  disabled={reviewText.length === 0}
                  control={
                    <Switch
                      value={isSpoiler}
                      onChange={(e) => setIsSpoiler(!isSpoiler)}
                    />
                  }
                  label="Has Spoiler?"
                />
              </FormGroup>
            </Grid>
            <Grid mb={3} item>
              <Stack direction="row" justifyContent="space-between">
                <Button
                  onClick={handleReviewModalClose}
                  variant="contained"
                  color="warning"
                >
                  Cancel
                </Button>

                <Button
                  disabled={!rating}
                  onClick={handleReviewModalSubmit}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>}
    </Box>
  );
}

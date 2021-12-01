import React from "react";
import { Box, styled } from "@mui/system";
import Carousel from "react-elastic-carousel";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import BookListCard from "./BookListCard";
import BookListCardSkeleton from "./BookListCardSkeleton";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 450, itemsToShow: 2, itemsToScroll: 2 },
  { width: 650, itemsToShow: 3, itemsToScroll: 3 },
  { width: 850, itemsToShow: 4, itemsToScroll: 4 },
  { width: 1050, itemsToShow: 5, itemsToScroll: 5 },
  { width: 1250, itemsToShow: 6, itemsToScroll: 6 },
  { width: 1450, itemsToShow: 7, itemsToScroll: 7 },
  { width: 1650, itemsToShow: 8, itemsToScroll: 8 },
  { width: 1850, itemsToShow: 9, itemsToScroll: 9 },
  { width: 2050, itemsToShow: 10, itemsToScroll: 10 },
];

const StyledCarousel = styled(Carousel)(({ theme }) => ({
   ".rec-arrow":{
      backgroundColor:theme.palette.primary.main,
      color:'#ffffff'
   }
}));

export default function BookCarousel({
  carouselData = [],
  isLoading,
  carouselTitle = "carouselTitle",
}) {
  return (
    <Box>
      <Typography gutterBottom variant="h5" sx={{ fontWeight: "bold" }}>
        {carouselTitle}
      </Typography>
      <Divider sx={{ marginBottom: "16px " }} />
      {!isLoading && carouselData?.length>0 ? (
        <StyledCarousel pagination={false} breakPoints={breakPoints}>
          {carouselData?.map((book) => {
            return (
              <Grid
                sx={{ display: "flex", height: "100%" }}
                item
                key={book.isbn}
              >
                <BookListCard cardData={book} />
              </Grid>
            );
          })}
        </StyledCarousel>
      ) : (
        <StyledCarousel breakPoints={breakPoints} pagination={false}>
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
            20,
          ].map((book) => {
            return (
              <Grid item key={book}>
                <BookListCardSkeleton cardData={book} />
              </Grid>
            );
          })}
        </StyledCarousel>
      )}
    </Box>
  );
}

import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/system";
import { Container, Grid, Paper } from "@mui/material";
import Image from "../../utils/shared/Image";
import BookDetailsCard from "./BookDetailsCard";
import Reviews from "../../utils/Reviews/Reviews";
import { useParams } from "react-router";
import { useFetch } from "use-http";
import BookDetailsSkeleton from "./BookDetailsSkeleton";
import PageLoading from "utils/shared/PageLoading";
import { getAuth } from "@firebase/auth";
import { paramsToQueryParams } from "tools/queryParamitizer";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Book() {
  const { id } = useParams();
  const user = getAuth().currentUser;
  const [reviewFilters, setReviewFilters] = useState({ sentiment: null });
  const { loading, data } = useFetch(
    `books/getBookById?${paramsToQueryParams({ isbn: id })}`,{cachePolicy:"no-cache"},
    [],
  );
  const {get: fetchReviews, loading: reviewsLoading, data: reviewsData } = useFetch(
    `reviews/${id}?${paramsToQueryParams({
      pageNumber: 1,
      reviewsPerPage: 100,
      sentiment: reviewFilters.sentiment,
    })}`,{cachePolicy:'no-cache'},
    [reviewFilters]
  );
  const bookData = data?.books;
  const updateFilters = (filters) => {
    setReviewFilters({ ...reviewFilters, ...filters });
  };
  useEffect(() => {
    fetchReviews()
    
  }, [fetchReviews])
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        minWidth: "100%",
      }}
    >
      <Container fixed maxWidth="lg">
        <Grid
          p={1}
          container
          spacing={2}
          justifyContent="space-between"
          display="flex"
        >
          <Grid item xs={12} sm={3} md={3} display="flex">
            <Image imagePath={bookData?.bookimage} alt={bookData?.title} />
          </Grid>
          <Grid display="flex" item xs={12} sm={9} md={9}>
            <Item sx={{ textAlign: "left", flexGrow: 1 }}>
              {loading && <BookDetailsSkeleton />}
              {data && (
                <BookDetailsCard isAuthenticated={!!user} bookData={bookData} />
              )}
            </Item>
          </Grid>
        </Grid>
        <Grid p={1} container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            {reviewsLoading && <PageLoading />}
            {!reviewsLoading && reviewsData?.reviews &&(
              <Reviews
                updateFilters={updateFilters}
                filters={reviewFilters}
                reviewsData={reviewsData}
                bookId={bookData?.isbn}
                fetchReviews = {fetchReviews}
                isAuthenticated={!!user}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

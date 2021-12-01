import React, { useState, useContext, useEffect } from "react";
import BookList from "./BookList";
import Pagination from "@mui/material/Pagination";
import { Books } from "../../context/Books";
import { useFetch } from "use-http";
import { toast } from "react-toastify";
import { bottomStandard } from "../../configs/toastConfigs";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BookListToolBar from "./BookListToolBar";
import { paramsToQueryParams } from "tools/queryParamitizer";

export default function AllBooks() {
  const [pageNumber, setPageNumber] = useState(1);
  const resultsPerPage = 20;
  const numberOfPages = 1;
  const { allBooksFilters, AddToGenres } = useContext(Books);
  const { loading, error, data } = useFetch(
    `books/allbooks?${paramsToQueryParams({
      pageNumber: pageNumber,
      resultsPerPage: resultsPerPage,
      numberOfPages: numberOfPages,
      ...allBooksFilters,
    })}`,[pageNumber,allBooksFilters]
  );
  const isLoading = loading;
  const handlePageChange = (event, page) => {
    setPageNumber(Number(page));
  };
  
  if (error) toast.error(`Failed to Fetch Books`, bottomStandard);
  useEffect(() => {
    if (data?.totalResults) {
      if (Math.ceil(data?.totalResults / resultsPerPage) < pageNumber)
        setPageNumber(1);
    }
    if (data?.genres) {
      AddToGenres(data?.genres);
    }
    return () => {};
  }, [data]);
  return (
    <Box>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ fontWeight: "bold" }}
      >
        All Books
      </Typography>

      <BookListToolBar
        genres={data?.genres}
        price={data?.price}
        rating={data?.rating}
      />
      <Divider sx={{ marginBottom: "16px " }} />

      <BookList
        pageNumber={pageNumber}
        books={data?.books}
        genres={data?.genres}
        bookListTitle={"All Books"}
        isLoading={isLoading}
      />
      {data?.totalResults !== 0 && (
        <Pagination
          onChange={handlePageChange}
          page={pageNumber}
          defaultPage={1}
          count={Math.ceil(Number(data?.totalResults / resultsPerPage)) || 0}
          variant="outlined"
          shape="rounded"
        />
      )}
    </Box>
  );
}

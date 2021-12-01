import { Container, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useFetch } from "tools/hooks/useFetch";
import EmptyData from "utils/shared/EmptyData";
import PageLoading from "utils/shared/PageLoading";
import MyBooksBook from "./MyBooksBook";

export default function MyBooks() {
  const { status,error,data } = useFetch('books/getbookbyuserid')
  if (status === 'fetching' || status === 'idle')
  return <PageLoading displayMsg="Loading you Books..." />
  if((!data?.books.length || error) && status==='fetched'){
    return <EmptyData emptyText={error?.message || "Booklist Empty"} />
  }
  return (
    <Box 
      sx={{
        display: "flex",
        flexFlow: "column",
        flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
       <Container fixed maxWidth="lg">
      <Stack direction="column" mt={2} gap={2} >
        {data?.books.map((book) => (
          <MyBooksBook key={book.isbn} bookDetails={book} />
        ))}
      </Stack>
      </Container>
    </Box>
  );
}

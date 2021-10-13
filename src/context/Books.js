import React, { createContext, useState, useRef } from 'react';

export const Books = createContext();

export function BooksContext({ children }) {
  const booksContext = SetBooksValues();

  return <Books.Provider value={booksContext}>{children}</Books.Provider>;
}

function SetBooksValues() {
  const booksRef = useRef({});
  const [topSellers, setTopSellers] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [isAllBooksLoading, setIsAllBooksLoading] = useState(true);
  const [allBooksTotal, setAllBooksTotal] = useState(0);
  const [allBooksPerPage, setAllBooksPerPage] = useState(10);
  const [allBooksPageNumber, setAllBooksPageNumber] = useState(1);
  const [allBooksFilters, setAllBooksFilters] = useState({});

  const setBookRef = (books) => {
    if (books) {
      books.map((book) => (booksRef.current[book.isbn] = book));
    }
  };

  const updateFilters = (filter) => {
    const newFilter = {};
    console.log({ ...allBooksFilters, ...filter });
    console.log(Object.entries({ ...allBooksFilters, ...filter }));
    Object.entries({ ...allBooksFilters, ...filter })?.map(
      ([filterKey, value], index) => {
        if (value !== null) {
          newFilter[filterKey] = value;
        }
        return null;
      }
    );
    setAllBooksFilters(newFilter);
  };

  return {
    isAllBooksLoading,
    setIsAllBooksLoading,
    allBooksPageNumber,
    setAllBooksPageNumber,
    setBookRef,
    allBooksTotal,
    setAllBooksTotal,
    allBooksPerPage,
    setAllBooksPerPage,
    updateFilters,
    allBooksFilters,
    topSellers,
    setTopSellers,
    recentlyViewed,
    setRecentlyViewed,
    recommended,
    setRecommended,
  };
}

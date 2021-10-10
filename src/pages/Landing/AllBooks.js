import React, { useState, useContext, useEffect } from 'react'
import BookList from './BookList';
import Pagination from '@mui/material/Pagination';
import { Books } from '../../context/Books';
import { useFetch } from '../../tools/hooks/useFetch';
import { toast } from 'react-toastify';
import { bottomStandard } from '../../configs/toastConfigs';


export default function AllBooks() {
    const [pageNumber, setPageNumber] = useState(1)
    const resultsPerPage = 20
    const numberOfPages = 1
    const { allBooksFilters } = useContext(Books)
    const { status, error, data } = useFetch('books/allbooks', {
        pageNumber: pageNumber,
        resultsPerPage: resultsPerPage,
        numberOfPages: numberOfPages
        , ...allBooksFilters
    });
    console.log(allBooksFilters)
    const isLoading = !(status === 'fetched')
    console.log(isLoading, status)
    const handlePageChange = (event, page) => {
        setPageNumber(page)
    }

    if (error)
        toast.error(`Failed to Register`, bottomStandard);
    useEffect(() => {
        if (data?.totalResults) {
            if (Math.ceil(data?.totalResults / resultsPerPage) < pageNumber)
                setPageNumber(1)
        }
        return () => {
        }
    }, [data])
    return (
        <>
            <BookList pageNumber={pageNumber} books={data?.books}
                bookListTitle={'All Books'} isLoading={isLoading} />
            {data?.totalResults !== 0 && <Pagination onChange={handlePageChange} page={pageNumber} defaultPage={1} count={Math.ceil(Number(data?.totalResults / resultsPerPage))} variant="outlined" shape="rounded" />}
        </>

    )
}

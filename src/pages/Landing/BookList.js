import React, { useContext } from 'react'
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import BookListCard from './BookListCard';
import BookListCardSkeleton from './BookListCardSkeleton';
import SearchBar from '../../utils/LandingPageComponents/SearchBar';
import Hover from '../../utils/LandingPageComponents/Hover';
import Sorter from '../../utils/LandingPageComponents/Sorter';
import { Books } from '../../context/Books';

const BookList = ({ books = [], bookListTitle = "carouselTitle", isLoading }) => {
    const { updateFilters, allBooksFilters } = useContext(Books)
    const setSearchValue = (value) => {
        console.log(value)
        updateFilters({ "search": value })

    }
    return (
        <Box>
            <Typography
                gutterBottom
                variant='h5'
                component='div'
                sx={{ fontFamily: 'Poynter,Georgia,serif', fontStyle: 'italic' }}
            >
                {bookListTitle}
            </Typography>

            <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center' }}>  <SearchBar keyword={allBooksFilters['search']} setKeyword={setSearchValue} /><Sorter />
                <Hover />
                <Divider sx={{ marginBottom: '16px ' }} /></Stack>
            {!isLoading ?
                <Grid container spacing={10} justifyContent="center" alignContent="flex-start">
                    {books?.map((book) => {
                        return (

                            <Grid sx={{ display: 'flex' }} item key={book.isbn} >
                                <BookListCard key={book.isbn} cardData={book} />
                            </Grid>
                        )
                    })
                    }
                </Grid>
                :
                <Grid container spacing={10} justifyContent="center">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((book) => {
                        return (
                            <Grid item key={book} >
                                <BookListCardSkeleton cardData={book} />
                            </Grid>
                        )
                    })}</Grid>
            }


        </Box>
    )
}
export default BookList

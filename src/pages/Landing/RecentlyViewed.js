import { Books } from '../../context/Books';
import React, { useState, useEffect, useContext, useRef } from 'react'
import BookCarousel from './BookCarousel';
import { getRequest } from '../../tools/apiHelper';
import { useFetch } from '../../tools/hooks/useFetch';

export default function BestSellers() {
    const { status, error, data } = useFetch('books/topsellers');
    const { setRecentlyViewed, recentlyViewed } = useContext(Books)
    const isLoading = !Boolean(recentlyViewed.length)
    useEffect(() => {
        if (data?.books) {
            setRecentlyViewed(data?.books)
        }

    }, [data])
    return (
        <BookCarousel isLoading={isLoading} carouselData={data?.books}
            carouselTitle={'Recently Viewed'} />

    )
}

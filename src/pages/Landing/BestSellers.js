import { Books } from '../../context/Books';
import React, { useState, useEffect, useContext, useRef } from 'react'
import BookCarousel from './BookCarousel';
import { useFetch } from '../../tools/hooks/useFetch';

export default function BestSellers() {
    const { status, error, data } = useFetch('books/topsellers');
    const { setTopSellers, topSellers } = useContext(Books)
    const isLoading = !Boolean(topSellers.length)
    useEffect(() => {
        if (data?.books) {
            setTopSellers(data?.books)
        }

    }, [data])
    return (
        <BookCarousel isLoading={isLoading} carouselData={data?.books || topSellers}
            carouselTitle={'BestSellers'} />

    )
}

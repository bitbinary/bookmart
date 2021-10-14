import { Books } from '../../context/Books';
import React, { useState, useEffect, useContext, useRef } from 'react'
import BookCarousel from './BookCarousel';
import { getRequest } from '../../tools/apiHelper';
import { useFetch } from '../../tools/hooks/useFetch';

export default function BestSellers() {
    const { status, error, data } = useFetch('books/topsellers');
    const { setRecommended, recommended } = useContext(Books)
    const isLoading = !Boolean(recommended.length)

    useEffect(() => {
        if (data?.books) {
            setRecommended(data?.books)
        }

    }, [data])
    return (
        <BookCarousel isLoading={isLoading} carouselData={data?.books}
            carouselTitle={'Recommended'} />

    )
}

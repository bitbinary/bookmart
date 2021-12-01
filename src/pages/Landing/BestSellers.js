import { Books } from '../../context/Books';
import React, {  useEffect, useContext, useRef } from 'react'
import BookCarousel from './BookCarousel';
import { useFetch } from 'use-http';

export default function BestSellers() {
    const {  data } = useFetch('books/topsellers',{},[]);
    const { setTopSellers, topSellers } = useContext(Books)
    const setTopSellersRef = useRef(setTopSellers)
    const isLoading = !Boolean(topSellers.length)
    useEffect(() => {
        if (data?.books) {
            setTopSellersRef.current(data?.books)
        }

    }, [data,setTopSellersRef])
    return (
        <BookCarousel isLoading={isLoading} carouselData={data?.books || topSellers}
            carouselTitle={'BestSellers'} />

    )
}

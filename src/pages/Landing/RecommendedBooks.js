import { Books } from '../../context/Books';
import React, {useEffect, useContext } from 'react'
import BookCarousel from './BookCarousel';
import { useFetch } from 'use-http';

export default function Recommended() {
    const { data } = useFetch('recommendations',{},[]);
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

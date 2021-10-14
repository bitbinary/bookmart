import { Books } from '../../context/Books';
import React, { useState, useEffect, useContext, useRef } from 'react';
import BookCarousel from './BookCarousel';
import { getRequest } from '../../tools/apiHelper';
import { useFetch } from '../../tools/hooks/useFetch';
import { auth } from '../../configs/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function BestSellers() {
   const [user] = useAuthState(auth);

   const { status, error, data } = useFetch('users/get_recentlyviewed');

   const { setRecentlyViewed, recentlyViewed } = useContext(Books);
   const isLoading = !Boolean(recentlyViewed.length);
   useEffect(() => {
      if (data?.books) {
         setRecentlyViewed(data?.books);
      }
   }, [data]);
   return (
      <BookCarousel
         isLoading={isLoading}
         carouselData={data?.books}
         carouselTitle={'Recently Viewed'}
      />
   );
}

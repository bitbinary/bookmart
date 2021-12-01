import { Books } from '../../context/Books';
import React, {  useEffect, useContext } from 'react';
import BookCarousel from './BookCarousel';
import { useFetch } from '../../tools/hooks/useFetch';

export default function RecentlyViewed() {

   const { data } = useFetch('users/get_recentlyviewed/');

   const { setRecentlyViewed, recentlyViewed } = useContext(Books);
   const isLoading = !Boolean(recentlyViewed.length);
   useEffect(() => {
      if (data?.books) {
         setRecentlyViewed(data?.books);
      }
   }, [data]);
   return (
      <>
         {!!recentlyViewed.length && (
            <BookCarousel
               isLoading={isLoading}
               carouselData={data?.books}
               carouselTitle={'Recently Viewed'}
            />
         )}
      </>
   );
}

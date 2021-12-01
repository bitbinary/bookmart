import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useFetch } from 'tools/hooks/useFetch';
import PageLoading from 'utils/shared/PageLoading';
import SalesTable from './SalesTable';

export default function Sales() {
   const { data } = useFetch('admin/getallpurchase', {}, 'GET', true);
   const [salesData, setSalesData] = useState(null);
   useEffect(() => {
      if (data?.purchase) {
         let slicedData = data?.purchase;
         slicedData.map((obj, idx) => {
            slicedData[idx].createdat = new Date(obj.createdat).toGMTString();
         });
         setSalesData(slicedData);
      }
   }, [data]);


   if (!salesData)
      return <PageLoading displayMsg='Fetching sales data, please wait...' />;
   return (
      <Box>
         <Container>
            <SalesTable sales={salesData} />
         </Container>
      </Box>
   );
}

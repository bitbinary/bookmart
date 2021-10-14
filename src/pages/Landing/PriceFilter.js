import React, { useContext, useEffect } from 'react';
import { Slider, Stack, Typography } from '@mui/material';
import { Books } from 'context/Books';

function valuetext(value) {
   return `${value[0]}  ${value[1]}`;
}
export default function PriceFilter({
   updateBookFilters,
   min,
   max,
   bookFilters,
}) {
   const { allBooksFilters } = useContext(Books);
   const initialValue = bookFilters?.price
      ? bookFilters?.price
      : allBooksFilters?.price
      ? allBooksFilters?.price
      : [0, 15];
   const [value, setValue] = React.useState(initialValue);
   useEffect(() => {
      updateBookFilters({
         price: value,
      });
   }, [value]);
   const marks = [
      { label: value[0], value: min },
      { label: value[1], value: max },
   ];
   return (
      <Stack direction='column' p={2}>
         <Typography color='primary' variant='subtitle1'>
            Price
         </Typography>
         <Slider
            getAriaLabel={() => 'Minimum distance'}
            min={min}
            max={max}
            step={0.1}
            value={value}
            marks={marks}
            onChange={(e) => setValue(e.target.value)}
            valueLabelDisplay='auto'
            getAriaValueText={valuetext}
            disableSwap
         />
      </Stack>
   );
}

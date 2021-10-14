import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Books } from 'context/Books';
import { CodeSharp } from '@mui/icons-material';
const setInitalValues = (array, referenceArray) => {
   if (!array?.length) return {};
   const result = {};
   array.map((arrayElement) => {
      result[arrayElement] =
         referenceArray?.indexOf(arrayElement) >= 0 ? true : false;
      return null;
   });
   return result;
};
const getSetArray = (array1, array2) => {
   return Array(...new Set([...array1, ...array2]));
};

export default function GenreFilters({
   genres,
   updateBookFilters,
   bookFilters,
}) {
   const { allBookGenres, allBooksFilters } = useContext(Books);
   const [generFilters, setGenreFilters] = useState(() =>
      setInitalValues(
         allBookGenres,
         getSetArray(
            bookFilters?.genres ? bookFilters?.genres : [],
            allBooksFilters?.genres ? allBooksFilters?.genres : []
         )
      )
   );
   const handleChange = (event) => {
      setGenreFilters({
         ...generFilters,
         [event.target.name]: event.target.checked,
      });
   };
   useEffect(() => {
      if (generFilters) {
         const activeFilters = [];
         Object.entries(generFilters)?.map(([filterKey, value], index) => {
            if (value) activeFilters.push(filterKey);
         });
         updateBookFilters({
            genres: activeFilters,
         });
      }
   }, [generFilters]);

   return (
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
         <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
            {/* <FormLabel component='legend'>Pick your Genre(s)</FormLabel> */}
            <Typography color='primary' variant='subtitle1'>
               {' '}
               Genres{' '}
            </Typography>
            <FormGroup
               sx={{
                  maxHeight: '300px',
                  overflowY: 'scroll',
                  overflowX: 'hidden',
                  flexFlow: 'column',
               }}
            >
               {allBookGenres?.map((genre) => {
                  return (
                     <FormControlLabel
                        control={
                           <Checkbox
                              checked={generFilters[genre]}
                              onChange={handleChange}
                              name={genre}
                           />
                        }
                        label={genre}
                     />
                  );
               })}
            </FormGroup>

            {/* <FormHelperText>You can display an error</FormHelperText> */}
         </FormControl>
      </Box>
   );
}

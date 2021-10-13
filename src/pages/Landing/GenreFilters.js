import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const convertArrayToObj = (array, defaultValue) => {
  if (!array) return {};
  const result = {};
  array.map((arrayElement) => {
    result[arrayElement] = defaultValue;
    return null;
  });
  return result;
};
export default function GenreFilters({ genres, updateBookFilters }) {
  const [generFilters, setGenreFilters] = useState(
    convertArrayToObj(genres, false)
  );

  const handleChange = (event) => {
    setGenreFilters({
      ...generFilters,
      [event.target.name]: event.target.checked,
    });
  };
  useEffect(() => {
    const activeFilters = Object.entries(generFilters)?.map(
      ([filterKey, value], index) => {
        if (value) return filterKey;
      }
    );
    updateBookFilters({
      genre: activeFilters,
    });
  }, [generFilters]);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        {/* <FormLabel component='legend'>Pick your Genre(s)</FormLabel> */}
        <Typography color="primary" variant="subtitle1">
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
          {genres?.map((genre) => {
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

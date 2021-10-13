import { Slider, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
const marks = [
  { label: '0', value: 0 },
  //   { label: '0.5', value: 10 },
  { label: '1', value: 1 },
  //   { label: '1.5', value: 30 },
  { label: '2', value: 2 },
  //   { label: '2.5', value: 50 },
  { label: '3', value: 3 },
  //   { label: '3.5', value: 70 },
  { label: '4', value: 4 },
  //   { label: '4.5', value: 90 },
  { label: '5', value: 5 },
];
export default function RatingFilter({ updateBookFilters }) {
  const [value, setValue] = React.useState([0, 5]);

  useEffect(() => {
    updateBookFilters({
      rating: value,
    });
  }, [value]);
  return (
    <Stack direction="column" p={2}>
      <Typography color="primary" variant="subtitle1">
        {' '}
        Ratings{' '}
      </Typography>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        marks={marks}
        min={0}
        max={5}
        step={0.5}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        // valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
        disableSwap
      />
    </Stack>
  );
}

import React, { useEffect } from 'react';
import { Slider, Stack, Typography } from '@mui/material';

function valuetext(value) {
  return `${value[0]}  ${value[1]}`;
}
export default function PriceFilter({ updateBookFilters }) {
  const [value, setValue] = React.useState([0, 15]);
  console.log(value);
  useEffect(() => {
    updateBookFilters({
      price: value,
    });
  }, [value]);
  return (
    <Stack direction="column" p={2}>
      <Typography color="primary" variant="subtitle1">
        Price
      </Typography>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        min={0}
        max={5}
        step={0.1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Stack>
  );
}

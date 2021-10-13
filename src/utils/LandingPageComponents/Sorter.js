import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Books } from '../../context/Books';

export default function ControlledOpenSelect({ isLoading, updateBookFilters }) {
  const [sortBy, setSortBy] = React.useState('');
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    let orderBy = null;
    let ascending = null;
    if (sortBy === 10) {
      orderBy = 'price';
      ascending = false;
    }
    if (sortBy === 20) {
      orderBy = 'price';
      ascending = true;
    }
    if (sortBy === 30) {
      orderBy = 'rating';
      ascending = false;
    }
    if (sortBy === 40) {
      orderBy = 'rating';
      ascending = true;
    }

    updateBookFilters({ orderBy: orderBy, ascending: ascending });
  }, [sortBy]);
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          id="demo-controlled-open-select-label"
          //    style={{ color: 'white' }}
        >
          Sort by
        </InputLabel>
        <Select
          disabled={isLoading}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sortBy}
          label="SortBy"
          onChange={handleChange}
          //    style={{ color: 'white' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Price High to Low</MenuItem>
          <MenuItem value={20}>Price Low to High</MenuItem>
          <MenuItem value={30}>Rating High to Low</MenuItem>
          <MenuItem value={40}>Rating Low to High</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

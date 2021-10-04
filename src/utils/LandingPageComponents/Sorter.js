import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function ControlledOpenSelect() {
   const [age, setAge] = React.useState('');
   const [open, setOpen] = React.useState(false);

   const handleChange = (event) => {
      setAge(event.target.value);
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
               id='demo-controlled-open-select-label'
               //    style={{ color: 'white' }}
            >
               Sort by
            </InputLabel>
            <Select
               labelId='demo-controlled-open-select-label'
               id='demo-controlled-open-select'
               open={open}
               onClose={handleClose}
               onOpen={handleOpen}
               value={age}
               label='Age'
               onChange={handleChange}
               //    style={{ color: 'white' }}
            >
               <MenuItem value=''>
                  <em>None</em>
               </MenuItem>
               <MenuItem value={10}>Price High to Low</MenuItem>
               <MenuItem value={20}>Price Low to High</MenuItem>
               <MenuItem value={30}>Rating High to Low</MenuItem>
               <MenuItem value={30}>Rating Low to High</MenuItem>
            </Select>
         </FormControl>
      </div>
   );
}

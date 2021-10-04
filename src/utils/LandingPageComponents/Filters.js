import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import bookshelves from './bookshelves.svg';
export default function Filters() {
   const genres = {
      biography: false,
      fiction: false,
      history: false,
      romance: false,
      horror: false,
      crime: false,
      religion: false,
      sciFi: false,
   };
   const [state, setState] = React.useState(genres);

   const handleChange = (event) => {
      setState({
         ...state,
         [event.target.name]: event.target.checked,
      });
      console.log(state);
   };

   const {
      biography,
      fiction,
      history,
      romance,
      horror,
      crime,
      religion,
      sciFi,
   } = state;

   return (
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
         <div
            style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flex: '3',
               backgroundColor: 'white',
            }}
         >
            <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
               {/* <FormLabel component='legend'>Pick your Genre(s)</FormLabel> */}
               <FormGroup>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={biography}
                           onChange={handleChange}
                           name='biography'
                        />
                     }
                     label='Biography'
                  />
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={fiction}
                           onChange={handleChange}
                           name='fiction'
                        />
                     }
                     label='Fiction'
                  />
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={history}
                           onChange={handleChange}
                           name='history'
                        />
                     }
                     label='History'
                  />
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={romance}
                           onChange={handleChange}
                           name='romance'
                        />
                     }
                     label='Romance'
                  />
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={horror}
                           onChange={handleChange}
                           name='horror'
                        />
                     }
                     label='Horror'
                  />
               </FormGroup>
               {/* <FormHelperText>Pick your Genre(s)</FormHelperText> */}
            </FormControl>
            <FormControl
               required
               // error={error}
               component='fieldset'
               sx={{ m: 3 }}
               variant='standard'
            >
               {/* <FormLabel component='legend'>Pick two</FormLabel> */}
               <FormGroup>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={crime}
                           onChange={handleChange}
                           name='crime'
                        />
                     }
                     label='Mystery & Crime'
                  />
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={religion}
                           onChange={handleChange}
                           name='religion'
                        />
                     }
                     label='Religion'
                  />
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={sciFi}
                           onChange={handleChange}
                           name='sciFi'
                        />
                     }
                     label='Sci-Fi & Fantasy'
                  />
                  <CardActions>
                     <Button size='medium' onClick={() => console.log(state)}>
                        Apply
                     </Button>
                     <Button size='small' onClick={() => setState(genres)}>
                        Clear all
                     </Button>
                  </CardActions>
               </FormGroup>

               {/* <FormHelperText>You can display an error</FormHelperText> */}
            </FormControl>
         </div>

         <div
            style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               flex: '3',
               backgroundColor: 'white',
            }}
         >
            <img src={bookshelves} style={{ width: '50%' }} />
         </div>
      </Box>
   );
}

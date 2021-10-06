import { TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import ImageUploader from './utils/ImageUploader';

const AllBook = ({ handleClose }) => {
   const { handleSubmit, control } = useForm();

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <Box
         sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100%',
         }}
      >
         <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
               //    '& > :not(style)': { width: '50ch' },
               width: '80%',
               height: '90%',
               display: 'flex',
               flexDirection: 'row',
               justifyContent: 'space-around',
               alignItems: 'center',
            }}
         >
            <div
               style={{
                  flex: 3,
                  height: '90%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
               }}
            >
               <Controller
                  name='isbn-10'
                  control={control}
                  defaultValue=''
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextField
                        className='controller'
                        label='ISBN-10'
                        variant='filled'
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                     />
                  )}
                  rules={{ required: 'ISBN number is required' }}
               />
               <Controller
                  name='title'
                  control={control}
                  defaultValue=''
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextField
                        className='controller'
                        label='Title'
                        variant='filled'
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                     />
                  )}
                  rules={{ required: 'Title is required' }}
               />
               <Controller
                  name='author'
                  control={control}
                  defaultValue=''
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextField
                        className='controller'
                        label='Author'
                        variant='filled'
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                     />
                  )}
                  rules={{ required: 'Author required' }}
               />
               <Controller
                  name='price'
                  control={control}
                  defaultValue=''
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextField
                        className='controller'
                        label='Price'
                        variant='filled'
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type='number'
                     />
                  )}
                  rules={{ required: 'Price required' }}
               />
               <Controller
                  name='genre'
                  control={control}
                  defaultValue=''
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextField
                        className='controller'
                        label='genre'
                        variant='filled'
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                     />
                  )}
                  rules={{ required: 'Genre is required' }}
               />
               <Controller
                  name='language'
                  control={control}
                  defaultValue=''
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextField
                        className='controller'
                        className='controller'
                        label='Language'
                        variant='filled'
                        value={value}
                        onChange={onChange}
                        //   error={!!error}
                        //   helperText={error ? error.message : null}
                        //   type='password'
                     />
                  )}
               />{' '}
            </div>
            <div
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 3,
                  justifyContent: 'space-between',
                  height: '80%',
                  alignItems: 'center',
               }}
            >
               <Controller
                  name='synopsis'
                  control={control}
                  defaultValue=''
                  render={({
                     field: { onChange, value },
                     fieldState: { error },
                  }) => (
                     <TextField
                        className='controller'
                        label='Synopsis'
                        variant='filled'
                        multiline
                        rows={34}
                        value={value}
                        onChange={onChange}
                        //   error={!!error}
                        //   helperText={error ? error.message : null}
                        //   type='password'
                     />
                  )}
               />

               {/* <Button variant='contained' onClick={handleClose}>
                  Cancel
               </Button> */}

               <ImageUploader />
               <Button type='submit' variant='contained' color='primary'>
                  Add Book
               </Button>
            </div>
         </form>
      </Box>
   );
};

export default AllBook;

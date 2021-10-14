import { TextField, Button } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import ImageUploader from './utils/ImageUploader';
import './AddBooks.css';

const formData = [
   {
      name: 'ISBN-10',
      rules: 'ISBN number is required',
      multiline: false,
      rows: 1,
   },
   { name: 'Title', rules: 'Title is required', multiline: false, rows: 1 },
   {
      name: 'Author',
      rules: 'Author name is required',
      multiline: false,
      rows: 1,
   },
   { name: 'Price', rules: 'Price is required', multiline: false, rows: 1 },
   { name: 'Genre', rules: 'Genre is required', multiline: false, rows: 1 },
   { name: 'Language', rules: null, multiline: false, rows: 1 },
   { name: 'Synopsis', rules: null, multiline: true, rows: 20 },
];

const AllBook = ({ handleClose }) => {
   const { handleSubmit, control } = useForm();

   const onSubmit = (data) => {};

   return (
      <Box className='addBooks-container'>
         <form
            className='addBooks-form-Container'
            onSubmit={handleSubmit(onSubmit)}
         >
            {formData.map((bookProps) => {
               return (
                  <Controller
                     name={bookProps.name}
                     control={control}
                     defaultValue=''
                     render={({
                        field: { onChange, value },
                        fieldState: { error },
                     }) => (
                        <TextField
                           className='controller'
                           label={bookProps.name}
                           variant='filled'
                           value={value}
                           multiline={bookProps.multiline}
                           rows={bookProps.rows}
                           onChange={onChange}
                           error={!!error}
                           helperText={error ? error.message : null}
                        />
                     )}
                     rules={{ required: bookProps.rules }}
                  />
               );
            })}

            <ImageUploader />
            <Button type='submit' variant='contained' color='primary'>
               Add Book
            </Button>
         </form>
      </Box>
   );
};

export default AllBook;

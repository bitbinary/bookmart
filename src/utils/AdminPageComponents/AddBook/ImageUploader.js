import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
   display: 'none',
});

export default function ImageUploader(props) {
   const { itemType, files, setFiles, startIcon, onImageSelect } = props;

   const fileSelectedHandler = (file) => {
      if (file['type'].split('/')[0] === 'image') {
         onImageSelect(file);
         setFiles({ ...files, bookImage: file });
      } else {
         setFiles({ ...files, book: file });
      }
   };

   return (
      <Stack direction='row' alignItems='center' spacing={2}>
         <label htmlFor='contained-button-file'>
            <Button variant='outlined' component='span' startIcon={startIcon}>
               <Input
                  // accept='image/*'
                  id='contained-button-file'
                  multiple
                  type='file'
                  onChange={(e) => fileSelectedHandler(e.target.files[0])}
               />
               {itemType}
            </Button>
         </label>
      </Stack>
   );
}

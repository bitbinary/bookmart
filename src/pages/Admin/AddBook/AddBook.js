import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { putRequest } from 'tools/apiHelper';
import Form from 'utils/AdminPageComponents/AddBook/EditPageComponents/Form';
import PageLoading from 'utils/shared/PageLoading';

import './AddBooks.css';

const formData = [
   {
      name: 'ISBN',
      rules: 'ISBN is required',
      multiline: false,
      rows: 1,
      type: 'text',
      required: true,
   },
   {
      name: 'title',
      rules: 'Title is required',
      multiline: false,
      rows: 1,
      type: 'text',
      required: true,
   },
   {
      name: 'author',
      rules: 'Author name is required',
      multiline: false,
      rows: 1,
      type: 'text',
      required: true,
   },
   {
      name: 'publicationYear',
      rules: null,
      multiline: false,
      rows: 1,
      type: 'text',
      required: true,
   },
   {
      name: 'price',
      rules: 'Price is required',
      multiline: false,
      rows: 1,
      type: 'number',
      required: true,
   },
   {
      name: 'genre',
      rules: 'Genre is required',
      multiline: false,
      rows: 1,
      type: 'text',
      required: true,
   },
   {
      name: 'language',
      rules: null,
      multiline: false,
      rows: 1,
      type: 'text',
      required: false,
   },

   {
      name: 'numpages',
      rules: null,
      multiline: false,
      rows: 1,
      type: 'number',
      required: false,
   },

   {
      name: 'synopsis',
      rules: null,
      multiline: true,
      rows: 10,
      type: 'text',
      required: false,
   },
];

const AddBook = ({ handleClose }) => {
   const [completed, setCompleted] = useState(true);

   let payLoad = [];
   const [files, setFiles] = useState({ bookImage: null, book: null });

   const postBook = async () => {
      if (payLoad) {
         const put = await putRequest('users/addBook', payLoad);
         if (put.status === 200) {
            uploadBook();
         } else {
            setCompleted(true);
            toast(`Something went wrong:${put.status}`);
         }
      }
   };

   function uploadBook() {
      var formData = new FormData();
      formData.append('bookImage', files.bookImage);
      formData.append('book', files.book);
      fetch(`http://localhost:5000/books/uploadFile/${payLoad.ISBN}`, {
         // content-type header should not be specified!
         method: 'POST',
         headers: {
            Authorization: localStorage.getItem('token'),
         },
         body: formData,
      })
         .then((response) => response.json())
         .then((success) => {
            setCompleted(true);
            toast(`Successfully added the book: ${payLoad.title}`);
            // Do something with the successful response
         })

         .catch((error) => {
            setCompleted(true);
            toast(`error:${error}`);
         });
   }

   const { handleSubmit, control } = useForm();

   const onSubmit = (data) => {
      setCompleted(false);
      if (!files.book || !files.bookImage) {
         toast('Please upload cover image and book');
         setCompleted(true);
      } else {
         data['rating'] = 0;
         data['synopsis'] = Array(data['synopsis']);
         data['price'] = Number(data['price']);
         data['numpages'] = Number(data['numpages']);
         payLoad = data;

         postBook();
      }
   };

   if (!completed)
      return <PageLoading displayMsg='Please wait while we add the book...' />;

   return (
      <Box  className='addBooks-container'>
         <Form
            formData={formData}
            onSubmit={onSubmit}
            control={control}
            handleSubmit={handleSubmit}
            buttonType='Add Book'
            files={files}
            setFiles={setFiles}
         />
      </Box>
   );
};

export default AddBook;

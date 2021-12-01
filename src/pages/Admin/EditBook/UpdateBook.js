import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { useForm} from 'react-hook-form';
import { toast } from 'react-toastify';
import { postRequest } from 'tools/apiHelper';
import { useFetch } from 'tools/hooks/useFetch';
import Form from 'utils/AdminPageComponents/AddBook/EditPageComponents/Form';
import PageLoading from 'utils/shared/PageLoading';
// import './AddBooks.css';

const UpdateBook = ({  isbn }) => {
   const { handleSubmit, control } = useForm();
   const [completed, setCompleted] = useState(true);

   const [files, setFiles] = useState({ bookImage: null, book: null });

   const {  data } = useFetch('books/getBookById', { isbn: isbn });

   let formData = [];
   let BookData = [];
   let payLoad = [];
   const onSubmit = (data) => {
      setCompleted(false);
      data['rating'] = BookData.rating;
      if (BookData.synopsis !== data['synopsis']) {
         data['synopsis'] = Array(data['synopsis']);
      }
      data['price'] = Number(data['price']);
      data['numpages'] = Number(data['numpages']);

      payLoad = data;

      updateBook();
   };

   function uploadBook() {
      var formData = new FormData();
      formData.append('bookImage', files.bookImage);
      formData.append('book', files.book);

      fetch(`http://localhost:5000/books/uploadFile/${isbn}`, {
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
            toast(`Successfully updated the book: ${payLoad.title}`);

            // Do something with the successful response
         })
         .catch((error) => {
            setCompleted(true);
            toast(error);
         });
   }

   const updateBook = async () => {
      if (payLoad) {
         const post = await postRequest(`books/${isbn}`, payLoad);

         if (post.status === 200) {
            if (files.bookImage && files.book) uploadBook();
            else {
               setCompleted(true);
               toast(`Successfully updated the book: ${payLoad.title}`);
            }
         } else {
            setCompleted(true);
            toast(`Something went wrong:${post.status}`);
         }
      }
   };

   if (data?.books) {
      BookData = data?.books;
      formData = [
         {
            name: 'title',
            rules: null,
            multiline: false,
            rows: 1,
            type: 'text',
            value: BookData.title,
         },
         {
            name: 'author',
            rules: null,
            multiline: false,
            rows: 1,
            type: 'text',
            value: BookData.author,
         },
         {
            name: 'publicationYear',
            rules: null,
            multiline: false,
            rows: 1,
            type: 'text',
            value: BookData.publicationyear,
         },
         {
            name: 'price',
            rules: null,
            multiline: false,
            rows: 1,
            type: 'number',
            value: BookData.price,
         },
         {
            name: 'genre',
            rules: null,
            multiline: false,
            rows: 1,
            type: 'text',
            value: BookData.genre,
         },
         {
            name: 'language',
            rules: null,
            multiline: false,
            rows: 1,
            type: 'text',
            value: BookData.language,
         },

         {
            name: 'numpages',
            rules: null,
            multiline: false,
            rows: 1,
            type: 'number',
            value: BookData.numpages,
         },
         // {
         //    name: 'bookURL',
         //    rules: null,
         //    multiline: false,
         //    rows: 1,
         //    type: 'text',
         //    value: BookData.bookurl,
         // },
         // {
         //    name: 'bookImage',
         //    rules: null,
         //    multiline: false,
         //    rows: 1,
         //    type: 'text',
         //    value: BookData.bookimage,
         // },
         {
            name: 'synopsis',
            rules: null,
            multiline: true,
            rows: 10,
            type: 'text',
            value: BookData.synopsis,
         },
      ];
   }

   if (!completed || !data?.books) {
      return (
         <PageLoading displayMsg=' Please wait while we upload and save the book details.....' />
      );
   }

   return (
      <Box className='addBooks-container'>
         <Form
            formData={formData}
            onSubmit={onSubmit}
            control={control}
            handleSubmit={handleSubmit}
            buttonType='Update Book Details'
            files={files}
            bookURL= {BookData.bookurl}
            bookimage= {BookData.bookimage}
            setFiles={setFiles}
         />
      </Box>
   );
};

export default UpdateBook;

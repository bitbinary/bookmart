import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SearchBar from './SearchBar';
import { deleteRequest, getRequest } from 'tools/apiHelper';
import { toast } from 'react-toastify';
import PageLoading from 'utils/shared/PageLoading';
import { Books } from 'context/Books';

function descendingComparator(a, b, orderBy) {
   if (b[orderBy] < a[orderBy]) {
      return -1;
   }
   if (b[orderBy] > a[orderBy]) {
      return 1;
   }
   return 0;
}

function getComparator(order, orderBy) {
   return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
   const stabilizedThis = array.map((el, index) => [el, index]);
   stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
         return order;
      }
      return a[1] - b[1];
   });
   return stabilizedThis.map((el) => el[0]);
}

const headCells = [
   {
      id: 'isbn',
      numeric: false,
      disablePadding: true,
      label: 'ISBN-10',
   },
   {
      id: 'title',
      numeric: false,
      disablePadding: true,
      label: 'Title',
   },
   {
      id: 'author',
      numeric: false,
      disablePadding: true,
      label: 'Author(s)',
   },
   {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
   },
];

function EnhancedTableHead(props) {
   const { order, orderBy, onRequestSort } = props;
   const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
   };

   return (
      <TableHead>
         <TableRow>
            <TableCell padding='checkbox'>
               {/* <Checkbox
                  color='primary'
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{
                     'aria-label': 'select all desserts',
                  }}
               /> */}
            </TableCell>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'left' : 'center'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  <TableSortLabel
                     active={orderBy === headCell.id}
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
                  >
                     <Typography variant='h6'> {headCell.label}</Typography>
                     {orderBy === headCell.id ? (
                        <Box component='span' sx={visuallyHidden}>
                           {order === 'desc'
                              ? 'sorted descending'
                              : 'sorted ascending'}
                        </Box>
                     ) : null}
                  </TableSortLabel>
               </TableCell>
            ))}
         </TableRow>
      </TableHead>
   );
}

EnhancedTableHead.propTypes = {
   numSelected: PropTypes.number.isRequired,
   onRequestSort: PropTypes.func.isRequired,
   onSelectAllClick: PropTypes.func.isRequired,
   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
   orderBy: PropTypes.string.isRequired,
   rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
   const { numSelected, selectedBook, setSelected, setSearchKey, setBooks } =
      props;

   const { allBooksFilters } = React.useContext(Books);

   const handleDeleteRequest = async () => {
      const result = await deleteRequest(`books/delete`, {
         isbn: selectedBook,
      });
      if (result.status === 200) {
         setSelected([]);
         setBooks(0);
         fetchBooks();
         setSearchKey('');
         toast('Sucessfully deleted');
      }
   };

   const fetchBooks = async () => {
      const books = await getRequest('books/allbooks', {
         pageNumber: 1,
         resultsPerPage: 8637,
         numberOfPages: 1,
         ...allBooksFilters,
      });
      if (books.status === 200) {
         if (books?.data?.books) setBooks(books?.data?.books);
      }
   };

   return (
      <Toolbar
         sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
               bgcolor: (theme) =>
                  alpha(
                     theme.palette.primary.main,
                     theme.palette.action.activatedOpacity
                  ),
            }),
         }}
      >
         {numSelected > 0 ? (
            <Typography
               sx={{ flex: '1 1 100%' }}
               color='inherit'
               variant='subtitle1'
               component='div'
            >
               {numSelected} selected
            </Typography>
         ) : (
            <Typography
               sx={{ flex: '1 1 100%' }}
               variant='h6'
               id='tableTitle'
               component='div'
            >
               Books
            </Typography>
         )}
         <SearchBar setSearchKey={setSearchKey} />

         {numSelected > 0 ? (
            <Tooltip title='Delete'>
               <IconButton>
                  <DeleteIcon onClick={handleDeleteRequest} />
               </IconButton>
            </Tooltip>
         ) : (
            <Tooltip title='Filter list'>
               <IconButton>
                  <FilterListIcon />
               </IconButton>
            </Tooltip>
         )}
      </Toolbar>
   );
};

EnhancedTableToolbar.propTypes = {
   numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable(props) {
   const { Books, onUpdateSelection } = props;
   const [order, setOrder] = React.useState('asc');
   const [orderBy, setOrderBy] = React.useState('calories');
   const [selected, setSelected] = React.useState([]);
   const [page, setPage] = React.useState(0);
   const [books, setBooks] = React.useState(0);

   const [searchKey, setSearchKey] = React.useState('');

   const [rowsPerPage, setRowsPerPage] = React.useState(15);

   const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleUpdateBook = (isbn) => {
      onUpdateSelection(isbn);
   };

   const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = books.map((n) => n.isbn);
         setSelected(newSelecteds);

         return;
      }
      setSelected([]);
   };

   const handleClick = (event, isbn) => {
      const selectedIndex = selected.indexOf(isbn);

      let newSelected = [];

      if (selectedIndex === -1) {
         newSelected = newSelected.concat(selected, isbn);
      } else if (selectedIndex === 0) {
         newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
         newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
         newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1)
         );
      }

      setSelected(newSelected);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const isSelected = (name) => selected.indexOf(name) !== -1;

   React.useEffect(() => {
      setBooks(Books);
   }, [Books]);

   if (!books) return <PageLoading displayMsg='Please wait ...' />;
   return (
      <Box sx={{ width: '100%' }}>
         <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
               numSelected={selected.length}
               selectedBook={selected}
               setSelected={setSelected}
               setSearchKey={setSearchKey}
               setBooks={setBooks}
            />
            <TableContainer>
               <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby='tableTitle'
                  size='medium'
               >
                  <EnhancedTableHead
                     numSelected={selected.length}
                     order={order}
                     orderBy={orderBy}
                     onSelectAllClick={handleSelectAllClick}
                     onRequestSort={handleRequestSort}
                     rowCount={books.length}
                  />
                  <TableBody>
                     {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                     {stableSort(books, getComparator(order, orderBy))
                        .filter((book) => {
                           return (
                              book.title
                                 .toString()
                                 .toLowerCase()
                                 .indexOf(searchKey.toString().toLowerCase()) >
                                 -1 ||
                              book.author
                                 .toString()
                                 .toLowerCase()
                                 .indexOf(searchKey.toString().toLowerCase()) >
                                 -1 ||
                              book.isbn
                                 .toString()
                                 .toLowerCase()
                                 .indexOf(searchKey.toString().toLowerCase()) >
                                 -1
                           );
                        })

                        .slice(
                           page * rowsPerPage,
                           page * rowsPerPage + rowsPerPage
                        )
                        .map((book, index) => {
                           const isItemSelected = isSelected(book.isbn);
                           const labelId = `enhanced-table-checkbox-${index}`;

                           return (
                              <TableRow
                                 hover
                                 role='checkbox'
                                 aria-checked={isItemSelected}
                                 tabIndex={-1}
                                 key={book.isbn}
                                 selected={isItemSelected}
                              >
                                 <TableCell padding='checkbox'>
                                    <Checkbox
                                       color='primary'
                                       checked={isItemSelected}
                                       inputProps={{
                                          'aria-labelledby': labelId,
                                       }}
                                       onClick={(event) =>
                                          handleClick(event, book.isbn)
                                       }
                                    />
                                 </TableCell>
                                 <TableCell
                                    component='th'
                                    id={labelId}
                                    scope='row'
                                    padding='none'
                                 >
                                    <Typography>{book.isbn}</Typography>
                                 </TableCell>
                                 <TableCell align='left'>
                                    <Typography> {book.title}</Typography>
                                 </TableCell>
                                 <TableCell align='left'>
                                    <Typography> {book.author}</Typography>
                                 </TableCell>
                                 <TableCell align='left'>
                                    <Typography> $ {book.price}</Typography>
                                 </TableCell>
                                 <TableCell align='left'>
                                    <EditIcon
                                       className='edit-icon'
                                       onClick={() =>
                                          handleUpdateBook(book.isbn)
                                       }
                                    />
                                 </TableCell>
                              </TableRow>
                           );
                        })}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               rowsPerPageOptions={[15, 10, 25]}
               component='div'
               count={books.length}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
            />
         </Paper>
      </Box>
   );
}

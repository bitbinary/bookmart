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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import SearchBar from '../EditBook/SearchBar';

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
      id: 'transactionid',
      numeric: false,
      disablePadding: true,
      label: 'Transaction-ID',
   },
   {
      id: 'isbn',
      numeric: false,
      disablePadding: true,
      label: 'ISBN-10',
   },

   {
      id: 'price',
      numeric: false,
      disablePadding: true,
      label: 'Price',
   },

   {
      id: 'createdat',
      numeric: false,
      disablePadding: true,
      label: 'Order Time',
   },
];

function EnhancedTableHead(props) {
   const {
      order,
      orderBy,
      onRequestSort,
   } = props;
   const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
   };

   return (
      <TableHead>
         <TableRow>
            {headCells.map((headCell) => (
               <TableCell
                  key={headCell.id}
                  id={headCell.id}
                  align={headCell.numeric ? 'center' : 'center'}
                  padding={headCell.disablePadding ? 'none' : 'normal'}
                  sortDirection={orderBy === headCell.id ? order : false}
               >
                  <TableSortLabel
                     direction={orderBy === headCell.id ? order : 'asc'}
                     onClick={createSortHandler(headCell.id)}
                  >
                     {headCell.label}
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
   const { numSelected, setSearchKey } = props;

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
               Sales Report
            </Typography>
         )}
         <SearchBar setSearchKey={setSearchKey} />
      </Toolbar>
   );
};

EnhancedTableToolbar.propTypes = {
   numSelected: PropTypes.number.isRequired,
};

export default function SalesTable({ sales }) {
   const [order, setOrder] = React.useState('asc');
   const [orderBy, setOrderBy] = React.useState('calories');
   const [selected, setSelected] = React.useState([]);
   const [page, setPage] = React.useState(0);
   const [dense, setDense] = React.useState(false);
   const [rowsPerPage, setRowsPerPage] = React.useState(15);
   const [searchKey, setSearchKey] = React.useState('');

   const handleRequestSort = (event, property) => {
      console.log(property, 'order');
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
   };

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   console.log(sales);

   // Avoid a layout jump when reaching the last page with empty sales.
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sales.length) : 0;

   return (
      <Box
         sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
         }}
      >
         <Box
            sx={{
               width: '80%',
               alignItems: 'center',
               display: 'flex',
               justifyContent: 'center',
            }}
         >
            <Paper sx={{ width: '100%', mb: 2 }}>
               <EnhancedTableToolbar
                  numSelected={selected.length}
                  setSearchKey={setSearchKey}
               />
               <TableContainer>
                  <Table
                     sx={{ minWidth: 750 }}
                     aria-labelledby='tableTitle'
                     size={dense ? 'small' : 'medium'}
                  >
                     <EnhancedTableHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={sales.length}
                     />
                     <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 sales.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(sales, getComparator(order, orderBy))
                           .filter((sale) => {
                              return (
                                 sale.price
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(
                                       searchKey.toString().toLowerCase()
                                    ) > -1 ||
                                 sale.isbn
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(
                                       searchKey.toString().toLowerCase()
                                    ) > -1 ||
                                 sale.transactionid
                                    .toString()
                                    .toLowerCase()
                                    .indexOf(
                                       searchKey.toString().toLowerCase()
                                    ) > -1
                              );
                           })
                           .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                           )
                           .map((sale, index) => {
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                 <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={sale.transactionid}
                                 >
                                    <TableCell
                                       component='th'
                                       id={labelId}
                                       scope='row'
                                       padding='none'
                                       align='center'
                                    >
                                       {sale.transactionid}
                                    </TableCell>
                                    <TableCell align='center'>
                                       {sale.isbn}
                                    </TableCell>
                                    <TableCell align='center'>
                                       $ {sale.price}
                                    </TableCell>
                                    <TableCell align='center'>
                                       {sale.createdat}
                                    </TableCell>
                                 </TableRow>
                              );
                           })}
                        {emptyRows > 0 && (
                           <TableRow
                              style={{
                                 height: (dense ? 33 : 53) * emptyRows,
                              }}
                           >
                              <TableCell colSpan={6} />
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
               <TablePagination
                  rowsPerPageOptions={[15, 10, 25]}
                  component='div'
                  count={sales.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
            </Paper>
         </Box>
      </Box>
   );
}

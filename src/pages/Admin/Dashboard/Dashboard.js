import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddIcon from '@mui/icons-material/Add';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddBook from '../AddBook/AddBook';
import EditBook from '../EditBook/EditBook';
import UpdateBook from '../EditBook/UpdateBook';
import Charts from './Charts';
import Sales from '../Sales/Sales';

const drawerWidth = 240;

const openedMixin = (theme) => ({
   width: drawerWidth,
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: 'hidden',
});

const closedMixin = (theme) => ({
   transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: 'hidden',
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
   },
});

const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
}));

const AdminRoutes = [
   {
      label: 'Dashboard',
      value: 'charts',
      icon: DashboardIcon,
   },
   {
      label: 'Add Book',
      value: 'add',
      icon: AddIcon,
   },
   {
      label: 'Edit Book',
      value: 'edit',
      icon: ModeEditIcon,
   },
   {
      label: 'Sales Data',
      value: 'sales',
      icon: MonetizationOnIcon,
   },
];
const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: 'nowrap',
   boxSizing: 'border-box',
   ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
   }),
}));

export default function Dashboard() {
   const [open, setOpen] = React.useState(false);
   const [selectedRoute, setSelectedRoute] = React.useState('charts');
   const [selectedBookForUpdate, setSelectedBookForUpdate] =
      React.useState(null);
   const handleDrawerOpen = () => {
      setOpen(true);
   };

   const handleDrawerClose = () => {
      setOpen(false);
   };
   const handleRouteChange = (value) => {
      setSelectedRoute(value);
   };
   const onUpdateSelection = (bookId) => {
      setSelectedRoute('update');
      setSelectedBookForUpdate(bookId);
   };
   return (
      <Box sx={{ display: 'flex', width: '100%' }}>
         <Drawer
            variant='permanent'
            PaperProps={{
               sx: { height: 'calc(100% - 64px)', top: 64 },
            }}
            containerStyle={{ height: 'calc(100% - 64px)', top: 64 }}
            open={open}
         >
            <DrawerHeader>
               <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={open ? handleDrawerClose : handleDrawerOpen}
                  edge='start'
                  sx={{}}
               >
                  <MenuIcon />
               </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
               {AdminRoutes.map((route, index) => (
                  <ListItem
                     button
                     key={route.label}
                     onClick={() => handleRouteChange(route.value)}
                  >
                     <ListItemIcon>{<route.icon />}</ListItemIcon>
                     <ListItemText primary={route.label} />
                  </ListItem>
               ))}
            </List>
         </Drawer>

         <Box component='main' sx={{ flexGrow: 1 }}>
            {selectedRoute === 'charts' && <Charts />}

            {selectedRoute === 'add' && <AddBook />}
            {selectedRoute === 'edit' && (
               <EditBook onUpdateSelection={onUpdateSelection} />
            )}
            {selectedRoute === 'update' && selectedBookForUpdate && (
               <UpdateBook isbn={selectedBookForUpdate} />
            )}
            {selectedRoute === 'sales' && <Sales />}
         </Box>
      </Box>
   );
}

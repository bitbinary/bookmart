import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { auth, logout } from '../../configs/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { Authenticator } from '../../context/Auth';

export default function Navbar() {
   const authContext = useContext(Authenticator);
   const isAdmin = authContext.isAdmin;
   const [user, loading] = useAuthState(auth);
   const [anchorEl, setAnchorEl] = React.useState(null);
   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

   const isMenuOpen = Boolean(anchorEl);
   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
   };

   const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
   };

   const handleLogout = () => {
      handleMenuClose();
      logout();
   };

   const menuId = 'primary-search-account-menu';
   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         id={menuId}
         keepMounted
         transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         open={isMenuOpen}
         onClose={handleMenuClose}
      >
         {!isAdmin && (
            <MenuItem onClick={handleMenuClose}>
               <Button color='inherit' component={Link} to='/myprofile'>
                  Account
               </Button>
            </MenuItem>
         )}
         <MenuItem onClick={handleLogout}>
            <Button color='inherit'>Logout</Button>
         </MenuItem>
      </Menu>
   );
   const mobileMenuId = 'primary-search-account-menu-mobile';

   const renderMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         <MenuItem onClick={handleMenuClose}>
            <Button color='inherit' component={Link} to='/'>
               Home
            </Button>
         </MenuItem>

         <MenuItem onClick={handleMenuClose}>
            <Button component={Link} to='/login' color='inherit'>
               Login
            </Button>
         </MenuItem>
      </Menu>
   );
   const renderAuthenticatedMobileMenu = (
      <Menu
         anchorEl={mobileMoreAnchorEl}
         anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         id={mobileMenuId}
         keepMounted
         transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
         }}
         open={isMobileMenuOpen}
         onClose={handleMobileMenuClose}
      >
         {isAdmin === false && (
            <MenuItem onClick={handleMenuClose}>
               <Button color='inherit' component={Link} to='/home'>
                  Home
               </Button>
            </MenuItem>
         )}
         {isAdmin === false && (
            <MenuItem onClick={handleMenuClose}>
               <Button color='inherit' component={Link} to='/mybooks'>
                  My Books
               </Button>
            </MenuItem>
         )}
         {isAdmin === false && (
            <MenuItem onClick={handleMenuClose}>
               <Button
                  component={Link}
                  to='/mycart'
                  size='large'
                  aria-label='17 items in cart'
                  color='inherit'
               >
                  <Badge badgeContent={17} color='error'>
                     <Typography variant='button'>My Cart </Typography>

                     <ShoppingCartIcon />
                  </Badge>
               </Button>
            </MenuItem>
         )}
         {isAdmin === false && (
            <MenuItem onClick={handleMenuClose}>
               <Button color='inherit' component={Link} to='/myprofile'>
                  Account
               </Button>
            </MenuItem>
         )}
         <MenuItem onClick={handleLogout}>
            <Button color='inherit'>Logout</Button>
         </MenuItem>
      </Menu>
   );

   const renderAuthenticatedNavItems = () => {
      if (isAdmin === true)
         return (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
               >
                  <AccountCircle />
               </IconButton>
            </Box>
         );
      else if (isAdmin === false)
         return (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               <Button color='inherit' component={Link} to='/home'>
                  Home
               </Button>
               <Button color='inherit' component={Link} to='/mybooks'>
                  My Books
               </Button>
               <Button
                  component={Link}
                  to='/mycart'
                  size='large'
                  aria-label='17 items in cart'
                  color='inherit'
               >
                  <Badge badgeContent={17} color='error'>
                     <Typography variant='button'>My Cart </Typography>

                     <ShoppingCartIcon />
                  </Badge>
               </Button>

               <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
               >
                  <AccountCircle />
               </IconButton>
            </Box>
         );
      else
         return (
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
               <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
               >
                  <AccountCircle />
               </IconButton>
            </Box>
         );
   };
   const renderUnauthenticatedNavItems = (
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
         <Button color='inherit' component={Link} to='/home'>
            Home
         </Button>
         <Button color='inherit' component={Link} to='/login'>
            Login
         </Button>
      </Box>
   );

   return (
      <Box sx={{ width: '100%' }}>
         <AppBar position='static'>
            <Toolbar>
               <Typography
                  variant='h6'
                  noWrap
                  component='div'
                  sx={{ display: { xs: 'none', sm: 'block' } }}
               >
                  bookMart
               </Typography>

               <Box sx={{ flexGrow: 1 }} />
               {!loading && user && renderAuthenticatedNavItems()}
               {!user && renderUnauthenticatedNavItems}
               <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                     size='large'
                     aria-label='show more'
                     aria-controls={mobileMenuId}
                     aria-haspopup='true'
                     onClick={handleMobileMenuOpen}
                     color='inherit'
                  >
                     <MoreIcon />
                  </IconButton>
               </Box>
            </Toolbar>
         </AppBar>
         {user && renderAuthenticatedMobileMenu}
         {!user && renderMobileMenu}
         {user && renderMenu}
      </Box>
   );
}

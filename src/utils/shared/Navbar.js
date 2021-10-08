import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';
import { auth, logout } from '../../configs/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

// const Search = styled('div')(({ theme }) => ({
//    position: 'relative',
//    borderRadius: theme.shape.borderRadius,
//    backgroundColor: alpha(theme.palette.common.white, 0.15),
//    '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//    },
//    marginRight: theme.spacing(2),
//    marginLeft: 0,
//    width: '100%',
//    [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//    },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//    padding: theme.spacing(0, 2),
//    height: '100%',
//    position: 'absolute',
//    pointerEvents: 'none',
//    display: 'flex',
//    alignItems: 'center',
//    justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//    color: 'inherit',
//    '& .MuiInputBase-input': {
//       padding: theme.spacing(1, 1, 1, 0),
//       // vertical padding + font size from searchIcon
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('md')]: {
//          width: '20ch',
//       },
//    },
// }));

export default function Navbar() {
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
      {!localStorage.getItem('userClaim') && (
        <MenuItem onClick={handleMenuClose}>
          <Button color="inherit" component={Link} to="/myprofile">
            Account
          </Button>
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>
        <Button color="inherit">Logout</Button>
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
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
      </MenuItem>

      <MenuItem onClick={handleMenuClose}>
        <Button component={Link} to="/login" color="inherit">
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
      {localStorage.getItem('userClaim') === 'false' && (
        <MenuItem onClick={handleMenuClose}>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
        </MenuItem>
      )}
      {localStorage.getItem('userClaim') === 'false' && (
        <MenuItem onClick={handleMenuClose}>
          <Button color="inherit" component={Link} to="/mybooks">
            My Books
          </Button>
        </MenuItem>
      )}
      {localStorage.getItem('userClaim') === 'false' && (
        <MenuItem onClick={handleMenuClose}>
          <Button
            component={Link}
            to="/mycart"
            size="large"
            aria-label="17 items in cart"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <Typography variant="button">My Cart </Typography>

              <ShoppingCartIcon />
            </Badge>
          </Button>
        </MenuItem>
      )}
      {localStorage.getItem('userClaim') === 'false' && (
        <MenuItem onClick={handleMenuClose}>
          <Button color="inherit" component={Link} to="/myprofile">
            Account
          </Button>
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>
        <Button color="inherit">Logout</Button>
      </MenuItem>
    </Menu>
  );

  const renderAuthenticatedNavItems = () => {
    const claims = localStorage.getItem('userClaim');
    if (claims === 'true')
      return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      );
    else if (claims === 'false')
      return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/mybooks">
            My Books
          </Button>
          <Button
            component={Link}
            to="/mycart"
            size="large"
            aria-label="17 items in cart"
            color="inherit"
          >
            <Badge badgeContent={17} color="error">
              <Typography variant="button">My Cart </Typography>

              <ShoppingCartIcon />
            </Badge>
          </Button>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      );
    else
      return (
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
      );
  };
  const renderUnauthenticatedNavItems = (
    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      <Button color="inherit" component={Link} to="/home">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            bookMart
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          {!loading && user && renderAuthenticatedNavItems()}
          {!user && renderUnauthenticatedNavItems}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
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

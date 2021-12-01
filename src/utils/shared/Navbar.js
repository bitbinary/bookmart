import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  Tooltip,
} from "@mui/material";
import { auth, logout } from "../../configs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { Authenticator } from "../../context/Auth";
import { styled } from "@mui/system";

export default function Navbar({ theme, setTheme }) {
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

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isAdmin && (
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
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
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
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {isAdmin === false && (
        <MenuItem onClick={handleMenuClose}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
        </MenuItem>
      )}
      {isAdmin === false && (
        <MenuItem onClick={handleMenuClose}>
          <Button color="inherit" component={Link} to="/mybooks">
            My Books
          </Button>
        </MenuItem>
      )}
      {isAdmin === false && (
        <MenuItem onClick={handleMenuClose}>
          <Button
            component={Link}
            to="/mycart"
            size="large"
            aria-label="Cart"
            color="inherit"
          >
            <Typography variant="button">My Cart </Typography>

            <ShoppingCartIcon />
          </Button>
        </MenuItem>
      )}
      {isAdmin === false && (
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
    if (isAdmin === true)
      return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
    else if (isAdmin === false)
      return (
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
            <Typography variant="button">My Cart </Typography>

            <ShoppingCartIcon />
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
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <Button color="inherit" component={Link} to="/home">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
    </Box>
  );

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Book Mart
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <FormGroup>
            <Tooltip title="Change Theme">
              <FormControlLabel
                control={
                  <MaterialUISwitch
                    sx={{ m: 1 }}
                    onChange={() => {
                      if (theme === "dark") {
                        setTheme("light");
                      }
                      if (theme === "light") {
                        setTheme("dark");
                      }
                    }}
                    checked={theme === "dark"}
                  />
                }
                label=""
              />
            </Tooltip>
          </FormGroup>

          {!loading && user && renderAuthenticatedNavItems()}
          {!user && renderUnauthenticatedNavItems}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
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

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },  
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#ebdd23",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

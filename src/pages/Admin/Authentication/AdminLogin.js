import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../../configs/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './AdminLogin.css';
import { Link } from 'react-router-dom';
import PageLoading from '../../../utils/shared/PageLoading';
import { Box } from '@mui/system';
import { AppBar, Grid, Tab, Tabs } from '@mui/material';
import LoginBox from './AdminLoginBox';
import RegisterBox from './AdminRegisterBox';
import SwipeableViews from 'react-swipeable-views';
function AdminLogin() {
  const [user, loading] = useAuthState(auth);
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace('/');
  }, [user, loading, history]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  if (loading) return <PageLoading />;
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid spacing={2} flexDirection="column" display="flex">
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Admin Login" {...a11yProps(0)} />
            <Tab label="Admin Register" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0}>
            <Grid
              item
              flexDirection="column"
              display="flex"
              p={2}
              sx={{ backgroundColor: '#cccbcb', minHeight: '300px' }}
            >
              <LoginBox />
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid
              item
              flexDirection="column"
              display="flex"
              p={2}
              sx={{ backgroundColor: '#cccbcb', minHeight: '300px' }}
            >
              <RegisterBox />
            </Grid>
          </TabPanel>
        </SwipeableViews>

        {/* <Grid m={1} item display="flex" justifyContent="center">
          <button
            className="login__btn login__google"
            onClick={signInWithGoogle}
          >
            Login with Google
          </button>
        </Grid> */}
        <Grid m={1} item display="flex" justifyContent="center">
          <Link to="/reset">Forgot Password</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
export default AdminLogin;

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../configs/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './login.css';
import { Link } from 'react-router-dom';
import PageLoading from '../../utils/shared/PageLoading';
import { Box } from '@mui/system';
import { AppBar, Grid, Tab, Tabs, Typography } from '@mui/material';
import LoginBox from './LoginBox';
import { signInWithGoogle } from '../../configs/firebase';
import RegisterBox from './RegisterBox';
import SwipeableViews from 'react-swipeable-views';
function Login() {
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
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Register" {...a11yProps(1)} />
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

        <Grid m={1} item display="flex" justifyContent="center">
          <button
            className="login__btn login__google"
            onClick={signInWithGoogle}
          >
            Login with Google
          </button>
        </Grid>
        <Grid m={1} item display="flex" justifyContent="center">
          <Link to="/reset">Forgot Password</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Login;

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

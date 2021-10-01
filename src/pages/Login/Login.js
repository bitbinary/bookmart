import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../../configs/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './login.css';
import { Link } from 'react-router-dom';
import PageLoading from '../../utils/shared/PageLoading';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import LoginBox from './LoginBox';
import { signInWithGoogle } from '../../configs/firebase';
import RegisterBox from './RegisterBox';
function Login() {
  const [user, loading] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace('/app');
  }, [user, loading, history]);
  if (loading) return <PageLoading />;
  return (
    <Box className="login">
      <Grid p={2} m={2} flexDirection="column" display="flex">
        <Grid spacing={2} display="flex">
          <Grid p={2} item m={2} flexDirection="column" display="flex">
            <LoginBox />
          </Grid>
          <Grid
            item
            flexDirection="column"
            display="flex"
            p={2}
            sx={{ backgroundColor: '#cccbcb' }}
          >
            <RegisterBox />
          </Grid>
        </Grid>
        <Grid item display="flex" justifyContent="center">
          <button
            className="login__btn login__google"
            onClick={signInWithGoogle}
          >
            Login with Google
          </button>
        </Grid>
        <Grid item display="flex" justifyContent="center">
          <Link to="/reset">Forgot Password</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Login;

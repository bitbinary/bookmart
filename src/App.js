import './App.scss';
import './configs/theme.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Landing from './pages/Landing/Landing';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, refreshToken, getUserClaims } from './configs/firebase';
import PageLoading from './utils/shared/PageLoading';
import Navbar from './utils/shared/Navbar';
import AuthenticatedLanding from './pages/Landing/AuthenticatedLanding';
import Tables from './AdminPages/Tables';
import Book from './pages/Book/Book';
import AddBook from './AdminPages/AddBook';
import MyBooks from './pages/MyBooks/MyBooks';
import MyCart from './pages/MyCart/MyCart';
import MyProfile from './pages/MyProfile/MyProfile';
import AdminLogin from './pages/Admin/Authentication/AdminLogin';
import { isAdmin } from '@firebase/util';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import { Popover, Typography } from '@mui/material';
import { getAuth } from '@firebase/auth';

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={Public} />
        </Switch>
      </Router>
    </div>
  );
}

const Protected = () => {
  const [user] = useAuthState(auth);
  const [ProtectedElement, setProtectedElement] = useState(<PageLoading />);
  useEffect(() => {
    if (!user) return null;
    const { emailVerified } = user;
    const claims = localStorage.getItem('userClaim');
    getUserClaims(claims === null)
      .then((idTokenResult) => {
        // Confirm the user is an Admin.
        localStorage.setItem('userClaim', !!idTokenResult.claims.admin);

        if (!!idTokenResult.claims.admin) {
          // Show admin UI.
          console.log('to Set:' + !!idTokenResult.claims.admin);
          localStorage.setItem('userClaim', !!idTokenResult.claims.admin);
          if (!emailVerified)
            setProtectedElement(
              <PublicRoutes showVerifyEmailNotification={true} />
            );
          setProtectedElement(
            <PrivateRoutesAdmin emailVerified={emailVerified} />
          );
        } else {
          // Show regular user UI.
          setProtectedElement(<PrivateRoutes emailVerified={emailVerified} />);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
  if (!user) return <Redirect to="/" />;
  refreshToken();

  return (
    <Route
      render={() => {
        return ProtectedElement;
      }}
    />
  );
};
const Public = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <PageLoading />;
  return (
    <Route
      render={() => {
        if (user) return <Protected />;
        return <PublicRoutes />;
      }}
    />
  );
};

const PrivateRoutes = ({ emailVerified }) => {
  // if (!emailVerified) return <ConfirmEmail />;
  return (
    <Switch>
      <Route exact path="/book/:id" component={Book} />
      <Route exact path="/mybooks" component={MyBooks} />
      <Route exact path="/mycart" component={MyCart} />
      <Route exact path="/myprofile" component={MyProfile} />
      <Route exact path="/tables" component={Tables} />
      <Route exact path="/add" component={AddBook} />
      <Route path="/admin-login" component={AdminLogin} />
      <Route path="/" component={AuthenticatedLanding} />
    </Switch>
  );
};
const PrivateRoutesAdmin = ({ emailVerified }) => {
  // if (!emailVerified) return <>Confirm email</>;
  return (
    <Switch>
      <Route exact path="/add" component={AddBook} />
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};
const PublicRoutes = (showVerifyEmailNotification) => {
  return (
    <>
      {auth.currentUser && showVerifyEmailNotification && (
        <div
          style={{
            backgroundColor: 'orange',
            width: '100%',
            padding: '10px',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1">
            Please verify you email to access full functionalities
          </Typography>
        </div>
      )}
      <Switch>
        <Route exact path="/reset" component={ResetPassword} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin-login" component={AdminLogin} />
        <Route path="/" component={Landing} />
      </Switch>
    </>
  );
};
export default App;

import './App.scss';
import './configs/theme.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useEffect, useState, useContext, useRef } from 'react';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Landing from './pages/Landing/Landing';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, refreshToken, getUserClaims } from './configs/firebase';
import PageLoading from './utils/shared/PageLoading';
import Navbar from './utils/shared/Navbar';
import Tables from './AdminPages/Tables';
import Book from './pages/Book/Book';
import AddBook from './AdminPages/AddBook';
import MyBooks from './pages/MyBooks/MyBooks';
import MyCart from './pages/MyCart/MyCart';
import MyProfile from './pages/MyProfile/MyProfile';
import AdminLogin from './pages/Admin/Authentication/AdminLogin';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@mui/material';
import { AuthContext, Authenticator } from './context/Auth';
import Container from '@mui/material/Container';
import { BooksContext } from './context/Books';

function App() {

  return (
    <div className="app">
      <AuthContext>
        <BooksContext>
          <Router>
            <Navbar />
            <Container sx={{
              flexGrow: 1,
              display: 'flex',
            }} >
              <Switch>
                <Route path="/" component={Public} />
              </Switch>
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Container>
          </Router>
        </BooksContext>
      </AuthContext>
    </div>
  );
}

const Protected = () => {
  const [user] = useAuthState(auth);
  const { setIsAdmin } = useContext(Authenticator)
  const setIsAdminRef = useRef(setIsAdmin)
  const [ProtectedElement, setProtectedElement] = useState(<PageLoading />);
  useEffect(() => {
    if (!user) return null;
    const { emailVerified } = user;
    const claims = localStorage.getItem('userClaim');
    getUserClaims(claims === null)
      .then((idTokenResult) => {
        // Confirm the user is an Admin.


        if (!!idTokenResult.claims.admin) {
          // Show admin UI.
          setIsAdminRef.current(true)
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
          setIsAdminRef.current(false)
          localStorage.setItem('userClaim', !!idTokenResult.claims.admin);
          setProtectedElement(<PrivateRoutes emailVerified={emailVerified} />);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user, setIsAdminRef]);
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
  console.log(loading)
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
      <Route path="/" component={Landing} />
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

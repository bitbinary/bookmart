import './App.scss';
import './configs/theme.js';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './pages/Login/Login';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Landing from './pages/Landing/Landing';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, refreshToken } from './configs/firebase';
import PageLoading from './utils/shared/PageLoading';
import Navbar from './utils/shared/Navbar';
import AuthenticatedLanding from './pages/Landing/AuthenticatedLanding';
import Tables from './AdminPages/Tables';
import Book from './pages/Book/Book';
import AddBook from './AdminPages/AddBook';
import MyBooks from './pages/MyBooks/MyBooks';
import MyCart from './pages/MyCart/MyCart';
import MyProfile from './pages/MyProfile/MyProfile';

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
  if (!user) return <Redirect to="/" />;
  refreshToken();
  const { emailVerified } = user;
  return (
    <Route
      render={() => {
        return <PrivateRoutes emailVerified={emailVerified} />;
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
      <Route exact path="/logout" component={Dashboard} />
      <Route exact path="/tables" component={Tables} />
      <Route exact path="/add" component={AddBook} />
      <Route path="/" component={AuthenticatedLanding} />
    </Switch>
  );
};
const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/reset" component={ResetPassword} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Landing} />
    </Switch>
  );
};
export default App;

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
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './configs/firebase';
import PageLoading from './utils/shared/PageLoading';
import Navbar from './utils/shared/Navbar';
function App() {
  return (
    <div className="app">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path="/app" component={Protected} />
          <Route path="/" component={Public} />
        </Switch>
      </Router>
    </div>
  );
}

const Protected = () => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <PageLoading />;
  if (!user) return <Redirect to="/" from="/app" />;
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
  return (
    <Route
      render={() => {
        if (user && !loading) return <Protected />;
        return <PublicRoutes />;
      }}
    />
  );
};

const PrivateRoutes = ({ emailVerified }) => {
  // if (!emailVerified) return <ConfirmEmail />;
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
    </Switch>
  );
};
const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/reset" component={ResetPassword} />
      <Route path="/" component={Login} />
    </Switch>
  );
};
export default App;

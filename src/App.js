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
import { getAuth } from '@firebase/auth';
import { auth } from './configs/firebase';
import PageLoading from './utils/shared/PageLoading';
function App() {
  return (
    <div className="app">
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
  const [user, loading, error] = useAuthState(auth);
  // const {
  //   auth: { emailVerified },
  // } = user;
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
  const [user, loading, error] = useAuthState(auth);
  return (
    <Route
      render={() => {
        if (user && !loading) return <Protected />;
        return <PublicRoutes />;
      }}
    />
  );
};

const ConfirmEmail = () => {
  return <div>ConfirmEmail</div>;
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

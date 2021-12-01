import "react-credit-cards/lib/styles.scss";
import "./App.scss";
import "./configs/theme.js";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import Login from "./pages/Login/Login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Landing from "./pages/Landing/Landing";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, refreshToken, getUserClaims } from "./configs/firebase";
import PageLoading from "./utils/shared/PageLoading";
import Navbar from "./utils/shared/Navbar";
import Book from "./pages/Book/Book";
import UpdateBook from "./pages/Admin/EditBook/UpdateBook";

import MyBooks from "./pages/MyBooks/MyBooks";
import MyCart from "./pages/MyCart/MyCart";
import MyProfile from "./pages/MyProfile/MyProfile";
import AdminLogin from "./pages/Admin/Authentication/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles, Paper, Typography } from "@mui/material";
import { AuthContext, Authenticator } from "./context/Auth";
import { AdminDashboardContext } from "./context/Dashboard";
import { BooksContext } from "./context/Books";
import { Box } from "@mui/system";
import ReadBook from "pages/ReadBook/ReadBook";
import { Provider } from "use-http";
import { darkTheme, lightTheme } from "./configs/theme";
import { ThemeContext } from "@mui/styled-engine";
import CssBaseline from "@mui/material/CssBaseline";
import * as firebaseAuth from "firebase/auth";

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <div className="app">
      <BooksContext>
        <AuthContext>
          <ThemeContext.Provider
            value={theme === "dark" ? darkTheme : lightTheme}
          >
            <GlobalStyles
              styles={{
                ".MuiSelect-root": {
                  color:
                    theme === "dark"
                      ? "#ffffff !important"
                      : "#000000 !important",
                },
                ".MuiInput-input": {
                  color:
                    theme === "dark"
                      ? "#ffffff !important"
                      : "#000000 !important",
                },
                ".MuiInputBase-input": {
                  color:
                    theme === "dark"
                      ? "#ffffff !important"
                      : "#000000 !important",
                  "-webkit-text-fill-color":
                    theme === "dark"
                      ? "#ffffff !important"
                      : "#000000 !important",
                },
                ".bluredText": {
                  textShadow:
                    theme === "dark"
                      ? "0 0 5px rgb(255 255 255 / 50%)"
                      : "0 0 5px rgb(0 0 0 / 50%)",
                },
              }}
            />
            <CssBaseline />
            <Router>
              <Navbar theme={theme} setTheme={setTheme} />
              <Box
                component={Paper}
                sx={{
                  borderRadius: 0,
                  flexGrow: 1,
                  display: "flex",
                  width: "100%",
                }}
              >
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
              </Box>
            </Router>
          </ThemeContext.Provider>
        </AuthContext>
      </BooksContext>
    </div>
  );
}

const Protected = () => {
  const [user] = useAuthState(auth);
  const { setIsAdmin } = useContext(Authenticator);
  const setIsAdminRef = useRef(setIsAdmin);
  const [ProtectedElement, setProtectedElement] = useState(<PageLoading />);
  useEffect(() => {
    if (!user) return null;
    const { emailVerified } = user;
    const claims = localStorage.getItem("userClaim");
    getUserClaims(claims === null)
      .then((idTokenResult) => {
        // Confirm the user is an Admin.

        if (!!idTokenResult.claims.admin) {
          // Show admin UI.
          setIsAdminRef.current(true);
          localStorage.setItem("userClaim", !!idTokenResult.claims.admin);
          if (!emailVerified)
            setProtectedElement(
              <PublicRoutes showVerifyEmailNotification={true} />
            );
          setProtectedElement(
            <PrivateRoutesAdmin emailVerified={emailVerified} />
          );
        } else {
          // Show regular user UI.
          setIsAdminRef.current(false);
          localStorage.setItem("userClaim", !!idTokenResult.claims.admin);
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

  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      request: async ({ options, url, path, route }) => {
        if (user) {
          const user = firebaseAuth.getAuth().currentUser;
          const token = await user.getIdToken();
          if (token) options.headers.Authorization = `${token}`;
        }
        return options;
      },
    },
  };

  if (loading) return <PageLoading />;
  return (
    <Provider url="http://localhost:5000/" options={options}>
      <Route
        render={() => {
          if (user) return <Protected />;
          return <PublicRoutes />;
        }}
      />
    </Provider>
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
      <Route exact path="/readbook/:id" component={ReadBook} />
      <Route path="/" component={Landing} />
    </Switch>
  );
};
const PrivateRoutesAdmin = ({ emailVerified }) => {
  // if (!emailVerified) return <>Confirm email</>;
  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      request: async ({ options, url, path, route }) => {
        const token = await localStorage.getItem("token");
        options.headers.Authorization = `${token}`;
        return options;
      },
    },
  };
  return (
    <Provider url="http://localhost:5000/" options={options}>
      <AdminDashboardContext>
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route exact path="/update/:id" component={UpdateBook} />
        </Switch>
      </AdminDashboardContext>
    </Provider>
  );
};
const PublicRoutes = (showVerifyEmailNotification) => {
  return (
    <>
      {auth.currentUser && showVerifyEmailNotification && (
        <div
          style={{
            backgroundColor: "orange",
            width: "100%",
            padding: "10px",
            textAlign: "center",
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
        <Route exact path="/book/:id" component={Book} />

        <Route path="/" component={Landing} />
      </Switch>
    </>
  );
};
export default App;

import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/ReactToastify.css";

function App() {
  // toast.configure();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  console.log("isAuthenticated", isAuthenticated);

  const checkIsAuth = async () => {
    console.log("isAuthenticated", isAuthenticated);
    try {
      const response = await fetch("http://localhost:5001/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkIsAuth();
  }, []);

  return (
    <>
      <Router>
        <div className="container">
          <ToastContainer />
          <Routes>
            <Route
              exact
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login setAuth={setAuth} />
                ) : (
                  <Navigate replace to={"/dashboard"} />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                !isAuthenticated ? (
                  <Register setAuth={setAuth} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />

            <Route
              exact
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard setAuth={setAuth} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

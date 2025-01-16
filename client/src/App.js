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
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route
              exact
              path="/login"
              element={
                !isAuthenticated ? (
                  <Login />
                ) : (
                  <Navigate replace to={"/dashboard"} />
                )
              }
            />
            <Route
              exact
              path="/register"
              element={
                isAuthenticated ? (
                  <Register />
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
                  <Dashboard />
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

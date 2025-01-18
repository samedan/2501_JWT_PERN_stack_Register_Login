import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button onClick={onSubmitForm} className="btn btn-success btn-block">
          Login
        </button>
      </form>
      <Link to="/register">Register</Link>
    </>
  );
}

export default Login;

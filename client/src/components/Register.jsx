import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, name, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch("http://localhost:5001/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      setAuth(true);
    } catch (err) {
      console.log(err);
      console.log(JSON.stringify(err.message));
    }
  };

  return (
    <>
      <h1 className="text-center my-5">Register</h1>

      <form action="" onSubmit={onSubmitForm} autoComplete="off">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control my-3"
          autoComplete="off"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          autoComplete="off"
          value={email}
          onChange={(e) => onChange(e)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          autoComplete="off"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Login</Link>
    </>
  );
}

export default Register;

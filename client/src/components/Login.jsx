import React from "react";

function Login({ setAuth }) {
  return (
    <>
      <div>Login</div>
      <button onClick={() => setAuth(true)}>Logout</button>
    </>
  );
}

export default Login;

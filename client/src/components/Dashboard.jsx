import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5001/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
      toast.error("Connection error. ".err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("You logged out.");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <div>
      <h1>Dashboard. {name && `Welcome, ${name} `}</h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;

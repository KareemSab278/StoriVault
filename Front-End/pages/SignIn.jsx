import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { setUser } from "../src/store/authSlice";
import { useNavigate } from "react-router-dom";
const url = "https://storivault-backend.onrender.com/";
// const url = "http://localhost:5000/";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include the diabetes in req
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.user) {
        dispatch(setUser({ username: data.user }));
        navigate("/");
        // gotta change this later - users cant keep going back to the main page everytime. will be frustrating.
        // console.log("Response data:", data);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ textAlign: "center", marginTop: "2rem" }}
    >
      backend services are currently down (cant afford the bill lol)
      <div
        style={{
          maxWidth: 400,
          margin: "4rem auto",
          padding: 24,
          border: "1px solid #ccc",
          borderRadius: 8,
          marginBottom: "2rem",
        }}
      >
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              required
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
            }}
          >
            Sign In
          </button>
        </form>
      </div>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Don't have an account?
      </button>
    </motion.div>
  );
}

export default SignIn;

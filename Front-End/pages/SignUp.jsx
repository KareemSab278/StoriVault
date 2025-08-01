import React from "react";
import { motion } from "framer-motion";
import { setUser } from "../src/store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

function SignUp() {
  const url = "https://storivault-backend.onrender.com/";
  // const url = "http://localhost:5000/";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUserState] = useState({
    username: "",
    fullname: "",
    password: "",
    email: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        password: user.password,
      };
      const response = await fetch(`${url}new-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include the diabetes in req
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (data.user) {
        dispatch(setUser(data.user));
        navigate("/");
        // console.log("Response data:", data);
      } else {
        alert("Sign up failed");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
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
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="fullname">Full Name</label>
              <input
                id="fullname"
                type="text"
                placeholder="Full Name"
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
                required
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>
            {user.password !== user.confirmPassword ? (
              <p style={{ color: "red" }}>Passwords do not match</p>
            ) : (
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
                Sign Up
              </button>
            )}
          </form>
        </div>
        <button
          onClick={() => {
            navigate("/signin");
          }}
        >
          Already have an account?
        </button>
      </motion.div>
    </>
  );
}

export default SignUp;

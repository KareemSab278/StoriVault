import React from "react";

function SignUp() {
  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Sign Up</h2>
      <form>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="fullname">Full Name</label>
          <input id="fullname" type="text" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input id="confirmPassword" type="password" style={{ width: "100%", padding: 8, marginTop: 4 }} />
        </div>
        <button type="submit" style={{ width: "100%", padding: 10, background: "#1976d2", color: "#fff", border: "none", borderRadius: 4 }}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
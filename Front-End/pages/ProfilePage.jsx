import React, { use, useEffect, useState } from "react";
import { getIdByUsername } from "../app";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ProfilePage() {
  // const location = useLocation();
  // const user = location.state?.signedInUser;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [signedInUser, setSignedInUser] = useState("Guest User");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user.username) {
      setSignedInUser(user);
      // console.log(user);
    } else {
      setSignedInUser("Guest User");
    }
  }, [user]);

  useEffect(() => {
  const fetchUserInfo = async () => {
    // Only fetch if signedInUser is an object and has a username
    if (
      typeof signedInUser !== "object" ||
      !signedInUser.username
    ) {
      return;
    }
    try {
      setLoading(true);
      const userInfo = await getIdByUsername(signedInUser.username);
      if (userInfo) {
        setSignedInUser(userInfo);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchUserInfo();
}, [signedInUser.username]);

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!user) return <div>No user data found.</div>;

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
            maxWidth: 500,
            margin: "2rem auto",
            padding: 24,
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <h2>Profile Page</h2>
          <img
            src={signedInUser.profile_picture}
            alt="Profile"
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              marginBottom: 16,
            }}
          />
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {signedInUser.email}
          </p>
          <p>
            <strong>Bio:</strong> {signedInUser.bio}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(signedInUser.created_at).toLocaleDateString()}
          </p>
        </div>
        <button onClick={() => navigate(`/mystories`)}>My Stories</button>
        <button onClick={() => navigate(`/my-reviews`)}>My Reviews</button>
      </motion.div>
    </>
  );
}

export default ProfilePage;

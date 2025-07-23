import React, { useEffect, useState } from "react";
import { getUser } from "../app";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  // const location = useLocation();
  // const user = location.state?.signedInUser;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser("685c5539c5cf817cd3d809b4");
        setUser(data);
      } catch (err) {
        setError("Failed to load user info.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
            src={user.profile_picture}
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
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
        <button onClick={() => navigate(`/mystories`)}>My Stories</button>
      </motion.div>
    </>
  );
}

export default ProfilePage;

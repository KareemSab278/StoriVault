import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { StoryCard } from "../src/components/StoryCard";
import { getAllStories } from "../app";

export default function LandingPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStories() {
      const data = await getAllStories();
      setStories(data);
      setLoading(false);
    }
    fetchStories();
  }, []);

  if (loading) return <div>Loading stories...</div>;
  if (!stories.length) return <div>No stories found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ textAlign: "center", marginTop: "2rem" }}
    >
      <h1>Welcome to StoriVault!</h1>
      <p>A place full of books written by lonely people who don't shower</p>

      <h2>Stories</h2>

      {stories.map((story) => (
        <StoryCard
          key={story._id}
          story={story}
          onClick={() => navigate(`/chapters/${story._id}`)}
        />
      ))}
    </motion.div>
  );
}

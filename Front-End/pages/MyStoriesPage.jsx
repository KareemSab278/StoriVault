import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { StoryCard } from "../src/components/StoryCard";
import { getStoriesByUser } from "../app";
import { useSelector } from "react-redux";

export function MyStoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const username = user?.username;
  const id = user?.id;

  useEffect(() => {
    async function fetchStories() {
      const data = await getStoriesByUser(username);
      setStories(data);
      setLoading(false);
    }
    fetchStories();
  }, []);

  if (loading) return <div>Loading stories...</div>;
  if (!stories.length)
    return (
      <>
        <div>No stories found</div>
        <button onClick={() => navigate(`/newstory`)}>
          Create a new story
        </button>
      </>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ textAlign: "center", marginTop: "2rem" }}
    >
      <h1>My Stories</h1>

      {stories.map((story) => (
        <StoryCard
          key={story._id}
          story={story}
          onClick={() => navigate(`/mychapters/${story._id}`)}
        />
      ))}
    </motion.div>
  );
}

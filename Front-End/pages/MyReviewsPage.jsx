import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { color, motion } from "framer-motion";
// import { StoryCard } from "../src/components/StoryCard";
import { getReviewsByUser } from "../app";
import { deleteReviewByReviewId } from "../app";
import { useSelector } from "react-redux";
import { getStory } from "../app";

export function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [storyTitles, setStoryTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const username = user?.username;

  async function deleteReview(id) {
    await deleteReviewByReviewId(id);
    setReviews((prev) => prev.filter((r) => r._id !== id));
  }

  useEffect(() => {
    async function fetchReviews() {
      const data = await getReviewsByUser(username);
      setReviews(data);

      // Fetch all story titles
      const titles = {};
      for (const review of data) {
        const story = await getStory(review.story_id);
        titles[review.story_id] = story.story_title;
      }
      setStoryTitles(titles);

      setLoading(false);
    }
    if (username) fetchReviews();
  }, [username]);

  if (loading) return <div>Loading reviews...</div>;
  if (!reviews.length) return <div>No reviews found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{ textAlign: "center", marginTop: "2rem" }}
    >
      <h1>My Reviews</h1>

      {reviews.map((review) => (
        <div key={review._id} style={{ marginBottom: "1.5rem" }}>
          <strong>Story:</strong> {storyTitles[review.story_id] || "Loading..."}
          <br />
          <strong>Rating:</strong> {review.stars} / 5 <br />
          <strong>Comment:</strong> {review.comment || "No comment"} <br />
          <button
            style={{ color: "red" }}
            onClick={() => deleteReview(review._id)}
          >
            delete
          </button>
          <hr style={{ marginTop: "1rem" }} />
        </div>
      ))}
    </motion.div>
  );
}

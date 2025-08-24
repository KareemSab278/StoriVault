import React, { useState } from "react";
import { motion } from "framer-motion";
import { createNewReview } from "../app";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export function LeaveReviewPage() {
  const { storyId } = useParams();
  const user = useSelector((state) => state.auth.user);

  const [review, setReview] = useState({
    stars: "1",
    comment: "",
  });

  console.log(user.username);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...review,
      username: user.username,
      // i need story id too...
      created_at: new Date().toISOString(),
    };
    const response = await createNewReview(storyId, payload);
    if (response.error === "duplicate") {
      alert("You already submitted a review");
    } else if (response.error) {
      alert("Error: " + response.error);
    } else {
      alert("Review submitted");
    }

    return response;
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
            maxWidth: 500,
            margin: "4rem auto",
            padding: 24,
            border: "1px solid #ccc",
            borderRadius: 8,
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <h2>Leave A Review</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label>Comment</label>
              <textarea
                name="comment"
                placeholder="Write your comment here"
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Stars</label>
              <select
                name="stars"
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                {/* this should be a star selector from Mui but im just working on functionality today lol */}
              </select>
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
              Submit Review
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}

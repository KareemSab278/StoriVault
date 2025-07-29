import React, { useState } from "react";
import { motion } from "framer-motion";
import { createNewStory } from "../app";

export function LeaveReview() {
  const [review, setReview] = useState({
    story_title: "",
    description: "",
    cover_image: null,
    genres: [],
    status: "draft",
  });

  const handleChange = (e) => {
    const { name, value, multiple, options } = e.target;

    if (multiple) {
      const selected = [...options]
        .filter((option) => option.selected)
        .map((option) => option.value);
      setReview((prev) => ({ ...prev, [name]: selected }));
    } else {
      setReview((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...review,
      user_id: "",
      username: "",
      comment: "",
    };
    await createNewStory(payload);
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
          }}
        >
          <h2>Leave A Review</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label>Rating</label>
              <input
                name="Rating"
                placeholder="1"
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Description"
                onChange={handleChange}
                required
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Cover Image URL</label>
              <input
                name="cover_image"
                placeholder="Cover Image URL"
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label>Genres</label>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: 4,
                }}
              >
                {[
                  "Fantasy",
                  "Science Fiction",
                  "Mystery",
                  "Romance",
                  "Horror",
                  "Thriller",
                  "Historical",
                  "Young Adult",
                  "Non-Fiction",
                ].map((genre) => (
                  <label
                    key={genre}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      type="checkbox"
                      name="genres"
                      value={genre}
                      checked={story.genres.includes(genre)}
                      onChange={(e) => {
                        const { value, checked } = e.target;
                        setStory((prev) => {
                          const newGenres = checked
                            ? [...prev.genres, value]
                            : prev.genres.filter((g) => g !== value);
                          return { ...prev, genres: newGenres };
                        });
                      }}
                    />
                    <span style={{ marginLeft: 4 }}>{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Status</label>
              <select
                name="status"
                onChange={handleChange}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
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
              Submit Story
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}

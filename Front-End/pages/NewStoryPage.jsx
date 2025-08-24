import React, { useState } from "react";
import { motion } from "framer-motion";
import { createNewStory } from "../app";
import { useNavigate } from "react-router-dom";

export function NewStory() {
  const navigate = useNavigate();
  const [story, setStory] = useState({
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
      setStory((prev) => ({ ...prev, [name]: selected }));
    } else {
      setStory((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...story,
      user_id: "685c55f7c5cf817cd3d809bd", // idk why it is overwritten lol but im afraid to remove this rn...
      username: "janedoe",
      created_at: new Date(),
      updated_at: new Date(),
      chapters: [],
    };
    await createNewStory(payload)
      .then(() => {
        alert("Story created successfully!");
        navigate("/mystories");
      })
      .catch((error) => {
        console.error("Error creating story:", error);
        alert("Failed to create story. Please try again.");
      });
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
          <h2>Create New Story</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label>Title</label>
              <input
                name="story_title"
                placeholder="Story Title"
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
                  "Adventure",
                  "Action",
                  "Comedy",
                  "Drama",
                  "Dystopian",
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

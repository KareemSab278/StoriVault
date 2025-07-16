import React, { useState } from "react";
import { motion } from "framer-motion";
import { createNewStory } from "../../app";

export function NewStory() {
  const [story, setStory] = useState({
    story_title: "",
    description: "",
    cover_image: "",
    genres: "",
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
      user_id: "685c55f7c5cf817cd3d809bd", // currently the user id is hard coded but we should be getting it when routing around in the app
      genres: story.genres,
      created_at: new Date(),
      updated_at: new Date(),
      chapters: [],
    };
    await createNewStory(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="story_title"
        placeholder="Story Title"
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
      />
      <input
        name="cover_image"
        placeholder="Cover Image URL"
        onChange={handleChange}
      />
      <select multiple name="genres" onChange={handleChange} required>
        <option value="">Select Genre</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Science Fiction">Science Fiction</option>
        <option value="Mystery">Mystery</option>
        <option value="Romance">Romance</option>
        <option value="Horror">Horror</option>
        <option value="Thriller">Thriller</option>
        <option value="Historical">Historical</option>
        <option value="Young Adult">Young Adult</option>
        <option value="Non-Fiction">Non-Fiction</option>
      </select>
      <select name="status" onChange={handleChange}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <button type="submit">Submit Story</button>
    </form>
  );
}

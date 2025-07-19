import { React, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { editChapter } from "../app";

export default function EditChapter() {
  // set state of chapter currently
  const [bottomTextStatus, setBottomTextStatus] =
    useState("editing chapter...");
  const { storyId, chapterNumber } = useParams();
  const [chapter, setchapter] = useState({
    title: "",
    content: "",
    chapter_number: null,
    updated_at: new Date(),
  });

  // get stuff from form

  // run function to edit chapter

  // prevent default.event

  const handleChange = (e) => {
    const { name, value } = e.target; // idk what this does... some usestate bs
    setchapter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: "",
      content: "",
      chapter_number: null,
      updated_at: new Date(),
    };
    await editChapter(storyId, chapterNumber, {
      // was sending empty payload, but it was not working. now works
      ...chapter,
      updated_at: new Date(),
    });
    setBottomTextStatus("Chapter updated successfully!");
  };

  return (
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
        <h2>Edit Chapter</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label>Title</label>
            <input
              name="title"
              placeholder="Chapter Title"
              value={chapter.title}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Content</label>
            <textarea
              name="content"
              placeholder="Chapter Content"
              value={chapter.content}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                minHeight: 150,
              }}
            />
          </div>

          {/* why edit chapyer number wjen it is alreadyu a param??? lololololol */}
          {/* <div style={{ marginBottom: 16 }}>
            <label>Chapter Number</label>
            <input
              type="number"
              name="chapter_number"
              placeholder="Chapter Number"
              value={chapter.chapter_number || ""}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </div> */}

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
            Save Chapter
          </button>
        </form>
        <p id="status-text" style={{ color: "white" }}>
          {bottomTextStatus}
        </p>
      </div>
    </motion.div>
  );
}

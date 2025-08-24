import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { addChapter, getAllChapters } from "../app";

export default function AddChapter() {
  const navigate = useNavigate();
  const [bottomTextStatus, setBottomTextStatus] =
    useState("Write your chapter");
  const { storyId } = useParams();

  const [chapterNumber, setChapterNumber] = useState(0);
  const [chapter, setChapter] = useState({
    title: "",
    content: "",
    chapter_number: 0,
    updated_at: new Date(),
  });

  useEffect(() => {
    async function fetchChapterCount() {
      const chapters = await getAllChapters(storyId);
      const nextNumber = chapters.length + 1;
      setChapterNumber(nextNumber);
      setChapter((prev) => ({ ...prev, chapter_number: nextNumber }));
    }
    fetchChapterCount();
  }, [storyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChapter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addChapter(storyId, {
        ...chapter,
        updated_at: new Date(),
      });
      setBottomTextStatus("new chapter added successfully!");
      setChapter({
        title: "",
        content: "",
        chapter_number: chapterNumber,
        updated_at: new Date(),
      });
      navigate(`/mychapter/${storyId}/${chapterNumber}`);
    } catch (error) {
      setBottomTextStatus("Failed to add chapter.");
      console.error(error);
    }
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
          userSelect: "none",
          WebkitTapHighlightColor: "transparent"
        }}
      >
        <h2>Add Chapter #{chapterNumber}</h2>
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
            Submit Chapter
          </button>
        </form>
        <p
          style={{
            color: bottomTextStatus.includes("failed") ? "red" : "white",
          }}
        >
          {bottomTextStatus}
        </p>
      </div>
    </motion.div>
  );
}

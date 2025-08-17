import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChapter } from "../app";
import { ChapterCard } from "../src/components/ChapterCard";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";
import { deleteChapter } from "../app";
// import deleteChapter from "../app"; // Assuming you have a deleteChapter function in app.js

// In production, you would get these from props, context, or the router (e.g. React Router):
// import { useParams } from 'react-router-dom';
// const { storyId, chapter_number } = useParams();

// const id = "686a7301c6e0afc1fd327c3e"; // REMOVE this in production
// const selectedChapter = 1; // REMOVE this in production
// this mus also be changed in the text box component

function MyChapterPage() {
  const { storyId, chapterNumber } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this chapter?"
    );
    if (!confirmDelete) return;
    else {
      const result = await deleteChapter(storyId, chapterNumber);
      if (result) {
        navigate(`/chapters/${storyId}`);
      } else {
        alert("Failed to delete chapter");
      }
    }
  };

  useEffect(() => {
    async function fetchChapter() {
      try {
        setLoading(true);
        const data = await getChapter(storyId, chapterNumber);
        setChapter(data);
      } catch (error) {
        console.error("there was an error fetching chapter:", error);
        setChapter(null);
      } finally {
        setLoading(false);
      }
    }
    fetchChapter();
  }, [storyId, chapterNumber]);

  if (loading) return <div>Loading chapter...</div>;
  if (!chapter) return <div>Can't get chapter data</div>;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: "center", marginTop: "2rem" }}
      >
        <ChapterCard chapter={chapter} />
        <button
          style={{ margin: "20px", background: "red" }}
          onClick={handleDelete}
        >
          delete chapter
        </button>
        <button
          style={{ margin: "20px", background: "yellow", color: "black" }}
          onClick={() => navigate(`/edit-chapter/${storyId}/${chapterNumber}`)} // navigate to edit chapter page
        >
          edit chapter
        </button>

        {/* <button style={{margin : "20px", background: "green"}}>publish chapter</button> */}
        {/* idk if we are publishing chapters or stories yet. right now it is just stories */}
      </motion.div>
    </>
  );
}

export default MyChapterPage;

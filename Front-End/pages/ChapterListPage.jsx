import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllChapters } from "../app";
import { motion } from 'framer-motion'

export function ChapterListPage() {
  const { storyId } = useParams();
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChapters() {
      const data = await getAllChapters(storyId);
      setChapters(data);
    }
    fetchChapters();
  }, [storyId]);

  return (
    <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
    <div>
      <h2>Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <h3
            key={chapter._id}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/chapter/${storyId}/${chapter.chapter_number}`)}
          >
            {chapter.title}
          </h3>
        ))}
      </ul>
    </div>
    </motion.div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllChapters } from "../app";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export function MyChapterListPage() {
  const { storyId } = useParams();
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const username = user?.username;
  const id = user?.id;

  useEffect(() => {
    async function fetchChapters() {
      const data = await getAllChapters(storyId);
      setChapters(data);
    }
    fetchChapters();
  }, [storyId]);
  console.log(username);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Chapters</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {chapters.map((chapter, index) => {
            const isHovered = hoveredIndex === index;
            const style = {
              cursor: "pointer",
              marginBottom: "1rem",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transition: "transform 0.2s ease",
            };

            return (
              <li
                key={chapter._id}
                style={style}
                onClick={() =>
                  navigate(`/mychapter/${storyId}/${chapter.chapter_number}`)
                }
                onMouseOver={() => setHoveredIndex(index)}
                onMouseOut={() => setHoveredIndex(null)}
              >
                <h3>{chapter.title}</h3>
              </li>
            );
          })}
        </ul>
      </div>

      {/* condition to check if username is same with chapter story username or not */}
      <button onClick={() => navigate(`/new-chapter/${storyId}`)}>
        Add new chapter
      </button>
    </>
  );
}

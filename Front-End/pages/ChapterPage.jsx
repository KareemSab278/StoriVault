import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChapter } from "../app";
import { ChapterCard } from "../src/components/ChapterCard";
import { motion } from "framer-motion";
import { Navigate, useNavigate } from "react-router-dom";


// In production, you would get these from props, context, or the router (e.g. React Router):
// import { useParams } from 'react-router-dom';
// const { storyId, chapter_number } = useParams();

// const id = "686a7301c6e0afc1fd327c3e"; // REMOVE this in production
// const selectedChapter = 1; // REMOVE this in production
// this mus also be changed in the text box component

function ChapterPage() {
  const { storyId, chapterNumber } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return(
    <>
    <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center", marginTop: "2rem" }}
        >
    <ChapterCard chapter={chapter}/>
    <button style={{margin : "20px", background: "red"}} onClick={() => navigate("/")}>delete chapter</button>
    <button style={{margin : "20px", background: "yellow", color: "black"}}>edit chapter</button>

    {/* <button style={{margin : "20px", background: "green"}}>publish chapter</button> */} 
    {/* idk if we are publishing chapters or stories yet. right now it is just stories */}
    </motion.div>
    </>
  );
}

export default ChapterPage;
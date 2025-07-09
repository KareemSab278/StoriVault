import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChapter } from "../app";
import { ChapterCard } from "../src/components/ChapterCard";


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

  return <ChapterCard chapter={chapter} />;
}

export default ChapterPage;
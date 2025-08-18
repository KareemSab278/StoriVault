import React from "react";
import TextBox from "./TextBox";

export function ChapterCard({ chapter }) {
  if (!chapter) return <div>No chapter data</div>;

  return (
    <div
      style={{
        width: "100%",
        minWidth: 800,
        maxWidth: 1100,
        margin: "2rem auto",
        padding: 20, 
        border: "1px solid #ccc",
        borderRadius: 8,
        boxSizing: "border-box",
      }}
    >
      <h2>
        {chapter.chapter_number} - <strong>{chapter.title}</strong>
      </h2>
      <TextBox text={chapter.content} />
    </div>
  );
}

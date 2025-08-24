import React from "react";
import TextBox from "./TextBox";

export function ChapterCard({ chapter }) {
  if (!chapter) return <div>No chapter data</div>;

  return (
    <div
      style={{
        width: "70vw",
        maxWidth: 700,
        boxSizing: "border-box",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <h2>
        {chapter.chapter_number} - <strong>{chapter.title}</strong>
      </h2>
      <TextBox text={chapter.content} />
    </div>
  );
}

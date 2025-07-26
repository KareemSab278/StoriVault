import { React, useState, useEffect } from "react";
import { Reviews } from "./Reviews";

export function StoryCard({ story, onClick }) {
  const [over, setOver] = useState(false); // set the state of the mouse hover
  const cardStyle = {
    // create the style object here
    width: "80%",
    margin: "2rem auto",
    padding: 12,
    border: "1px solid #ccc",
    borderRadius: 20,
    cursor: "pointer",
    transform: "scale(1)",
    transition: "transform 0.2s ease",
  };
  cardStyle.transform = over ? "scale(1.1)" : "scale(1)"; // condition for hover or nah

  if (!story) return <div>No story data</div>;

  return (
    <div
      onClick={onClick}
      style={cardStyle} // this
      onMouseOver={() => setOver(true)} // is
      onMouseOut={() => setOver(false)} // the hover effect
    >
      <h2>
        <strong>{story.story_title}</strong>
      </h2>
      <img
        src={story.cover_image}
        alt="cover image"
        style={{
          width: 220,
          height: 220,
          borderRadius: "10%",
          objectFit: "cover",
          marginBottom: 10,
        }}
      />
      <p>
        <strong>Created By:</strong> {story.username}
      </p>
      <p>
        <strong>Description:</strong> {story.description}
      </p>
      <p>
        <strong>Genres:</strong> {story.genres.join(", ")}
      </p>
      <p>
        <strong>Chapters:</strong> {story.chapters.length}
      </p>
      <Reviews storyId={story._id} />
    </div>
  );
}

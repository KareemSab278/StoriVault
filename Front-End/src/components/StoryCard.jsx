export function StoryCard({ story, onClick }) {
  if (!story) return <div>No story data</div>;

  return (
    <div
      onClick={onClick}
      style={{
        width: "80%",
        margin: "2rem auto",
        padding: 12,
        border: "1px solid #ccc",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      <h2><strong>{story.story_title}</strong></h2>
      <img
        src={story.cover_image}
        alt="cover image"
        style={{ width: 220, height: 220, borderRadius: "10%", objectFit: "cover", marginBottom: 10 }}
      />
      <p><strong>Created By:</strong> {story.username}</p>
      <p><strong>Description:</strong> {story.description}</p>
      <p><strong>Genres:</strong> {story.genres.join(", ")}</p>
      <p><strong>Chapters:</strong> {story.chapters.length}</p>
    </div>
  );
}

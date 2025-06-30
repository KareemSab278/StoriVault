
const getChapter = async (id, chapter_number) => {
    try {
        const response = await fetch(`http://localhost:5000/stories/${id}/chapters/${chapter_number}`);
        const data = await response.json();
        return data;
  } catch (error) {
        console.error(error.message);
    }
}

export default getChapter;
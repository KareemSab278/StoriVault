const url = 'http://localhost:5000/'

const getChapter = async (id, chapter_number) => {
    try {
        const response = await fetch(`${url}stories/${id}/chapters/${chapter_number}`);
        const data = await response.json();
        return data;
  } catch (error) {
        console.error(error.message);
    }
}


// need to add a chapter to a story //
export const addChapter = async (storyId, chapter) => {
  try {
    const response = await fetch(`${url}add-chapter/${storyId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chapter)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export default getChapter
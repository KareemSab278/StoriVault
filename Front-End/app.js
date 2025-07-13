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

const getAllChapters = async (id) => {
  try {
    const response = await fetch(`${url}stories/${id}/chapters`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};


 const getStory = async (id) => {
    try {
        const response = await fetch(`${url}stories/${id}`);
        const data = await response.json();
        return data;
  } catch (error) {
        console.error(error.message);
    }
}

const getAllStories = async () => {
  try {
    const response = await fetch(`${url}stories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};



// need to add a chapter to a story //
 const addChapter = async (storyId, chapter) => {
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

const getUser = async (id) => {
  try {
    const response = await fetch(`${url}user/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getAllUsers = async () => {
    try {
      const response = await fetch(`${url}user`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
};


export { getChapter, getStory, addChapter, getUser, getAllStories, getAllChapters, getAllUsers};

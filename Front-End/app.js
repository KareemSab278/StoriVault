import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./src/store/authSlice";
import { Routes, Route } from "react-router-dom";

const url = "https://storivault-backend.onrender.com/";
// const url = "http://localhost:5000/"; // Uncomment for local development

const getChapter = async (id, chapter_number) => {
  try {
    const response = await fetch(
      `${url}stories/${id}/chapters/${chapter_number}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    //console.log("getChapter function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getAllChapters = async (id) => {
  try {
    const response = await fetch(`${url}stories/${id}/chapters`, {
      credentials: "include",
    });
    const data = await response.json();
    //console.log("getAllChapters function called from app.js");
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getStory = async (id) => {
  try {
    const response = await fetch(`${url}stories/${id}`, {
      credentials: "include",
    });
    const data = await response.json();
    //console.log("getStory function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getReviews = async (storyId) => {
  try {
    const response = await fetch(`${url}reviews/${storyId}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    //console.log("getReviews function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getAllStories = async () => {
  try {
    const response = await fetch(`${url}stories`, {
      credentials: "include",
    });
    const data = await response.json();
    //console.log("getAllStories function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getStoriesByUser = async (username) => {
  try {
    const response = await fetch(`${url}stories/user/${username}`, {
      credentials: "include",
    });
    const data = await response.json();
    //console.log("getStoriesByUser function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getReviewsByUser = async (username) => {
  try {
    const response = await fetch(`${url}reviews/user/${username}`, {
      credentials: "include",
    });
    const data = await response.json();
    //console.log("getStoriesByUser function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const deleteReviewByReviewId = async (reviewId) => {
  try {
    const response = await fetch(`${url}delete-review/${reviewId}`, {
      method: "DELETE",
      credentials: "include",
    });
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // include the diabetes in req
      // body: JSON.stringify({ username, chapter }),
      body: JSON.stringify(chapter),
    });
    const data = await response.json();
    //console.log("addChapter function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const createNewStory = async (story) => {
  try {
    const response = await fetch(`${url}new-story`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(story),
      credentials: "include",
    });
    const data = await response.json();
    //console.log("createNewStory function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const createNewReview = async (storyId, review) => {
  try {
    const response = await fetch(`${url}new-review/${storyId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review),
      credentials: "include",
    });

    if (response.status === 409) {
      return { error: "duplicate" };
    }
    if (!response.ok) {
      throw new Error("Failed to create review");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    return { error: error.message };
  }
};

const getUser = async (id) => {
  try {
    const response = await fetch(`${url}user/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    //console.log("getUser function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getIdByUsername = async (username) => {
  try {
    const response = await fetch(`${url}user/username/${username}`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) throw new Error("User fetch failed");

    const data = await response.json();
    // console.log("getUserByUsername function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetch(`${url}user`, {
      credentials: "include",
    });
    const data = await response.json();
    //console.log("getAllUsers function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const editChapter = async (storyId, chapterNumber, chapter) => {
  try {
    const response = await fetch(
      `${url}edit-chapter/${storyId}/${chapterNumber}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chapter),
        credentials: "include",
      }
    );
    const data = await response.json();
    //console.log("editChapter function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

// "/stories/:id/chapters/:chapter_number

const deleteChapter = async (storyId, chapterNumber) => {
  try {
    const response = await fetch(
      `${url}delete-chapter/${storyId}/${chapterNumber}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete chapter");
    }
    const data = await response.json();
    //console.log("deleteChapter function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const deleteStory = async (storyId) => {
  try {
    const response = await fetch(`${url}delete-story/${storyId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to delete story");
    }
    const data = await response.json();
    //console.log("deleteStory function called from app.js");
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export {
  getChapter,
  getStory,
  addChapter,
  getUser,
  getAllStories,
  getAllChapters,
  getAllUsers,
  getReviews,
  createNewStory,
  createNewReview,
  editChapter,
  deleteChapter,
  deleteReviewByReviewId,
  getIdByUsername,
  getStoriesByUser,
  getReviewsByUser,
  deleteStory,
};

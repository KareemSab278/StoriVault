import "./styles/App.css";
import PageLayout from "./components/PageLayout";
import ChapterPage from "../pages/ChapterPage";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ProfilePage from "../pages/ProfilePage";
import LandingPage from "../pages/LandingPage";
import { ChapterListPage } from "../pages/ChapterListPage";
import { NewStory } from "../pages/NewStoryPage";
import EditChapterPage from "../pages/EditChapterPage";
import NewChapterPage from "../pages/NewChapterPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "./store/authSlice";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MyStoriesPage } from "../pages/MyStoriesPage";
import { MyChapterListPage } from "../pages/MyChapterListPage";
import MyChapterPage from "../pages/MyChapterPage";

function App() {
  // const url = "http://localhost:5000/";
  const url = "https://storivault-backend.onrender.com/";
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${url}auth/status`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => dispatch(setUser(data.user)))
      .catch(() => dispatch(clearUser()));
  }, []);

  return (
    <PageLayout>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* get the user and then check if there is a user. create a ternary op to decide if route is protected ir not depending on user */}
        {/* if no user then protect and force sign in else show landing page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chapters/:storyId"
          element={
            <ProtectedRoute>
              <ChapterListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mystories"
          element={
            <ProtectedRoute>
              <MyStoriesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chapter/:storyId/:chapterNumber"
          element={
            <ProtectedRoute>
              <ChapterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mychapter/:storyId/:chapterNumber"
          element={
            <ProtectedRoute>
              <MyChapterPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mychapters/:storyId"
          element={
            <ProtectedRoute>
              <MyChapterListPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-chapter/:storyId/:chapterNumber"
          element={
            <ProtectedRoute>
              <EditChapterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newstory"
          element={
            <ProtectedRoute>
              <NewStory />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/delete-chapter/:storyId/:chapterNumber"
          element={
            <ProtectedRoute>
              <ChapterPage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/delete-chapter/:storyId/:chapterNumber"
          element={
            <ProtectedRoute>
              <MyChapterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="new-chapter/:storyId"
          element={
            <ProtectedRoute>
              <NewChapterPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </PageLayout>
  );
}

export default App;

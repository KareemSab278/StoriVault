import './styles/App.css'
import PageLayout from './components/PageLayout';
import ChapterPage from '../pages/ChapterPage';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProfilePage from '../pages/ProfilePage';
import LandingPage from '../pages/LandingPage';
import { ChapterListPage } from '../pages/ChapterListPage';




function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chapter" element={<ChapterPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/chapters/:storyId" element={<ChapterListPage />} />
        <Route path="/chapter/:storyId/:chapterNumber" element={<ChapterPage />} />
      </Routes>
    </PageLayout>
  );
}

export default App
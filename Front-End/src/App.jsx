import { motion } from 'framer-motion' // added in for simple and quick animations. no need for writing any yourself. saves hastle.
import './styles/App.css'
import TextBox from './components/TextBox'
import FloatingActionButtons from './components/FloatingButtons'
import PageLayout from './components/PageLayout';
import ChapterPage from '../pages/ChapterPage';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProfilePage from '../pages/ProfilePage';


function Home() {
  return (
    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Welcome to StoriVault!</h1>
      <p>A place full of warewolf porn fantasies written by teen girls who dont shower</p>
    </motion.div>
  );
}

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chapter" element={<ChapterPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </PageLayout>
  );
}

export default App
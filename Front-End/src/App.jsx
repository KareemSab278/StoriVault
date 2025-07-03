import { motion } from 'framer-motion' // added in for simple and quick animations. no need for writing any yourself. saves hastle.
import './styles/App.css'
import TextBox from './components/TextBox'
import FloatingActionButtons from './components/FloatingButtons'
import PageLayout from './components/PageLayout';
import ChapterPage from '../pages/ChapterPage';

function App() {
  return (
    <>    
      {/* fade in */}
      <PageLayout/>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginTop: '2rem' }}>
      
        <h1>Welcome to StoriVault!</h1>
        <p>A place full of warewolf porn fantasies written by teen girls who dont shower</p>

        <ChapterPage/> {/* this is a page im supposed to create navigation to ASAP. it is only here for testing. im gonna start adding navigation soon */}
        {/* i am a textbox for displayign chapter 1 of story 1 */}

        {/* <FloatingActionButtons/> */}

      </motion.div>
    </>
  )
}

export default App
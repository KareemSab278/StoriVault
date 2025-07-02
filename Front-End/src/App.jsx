import { motion } from 'framer-motion' // added in for simple and quick animations. no need for writing any yourself. saves hastle.
import './App.css'
import TextBox from './components/TextBox'
import FloatingActionButtons from './components/FloatingButtons'
import PageLayout from './components/PageLayout';

function App() {
  return (
    <>
      {/* fade in */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginTop: '2rem' }}>
      
        {/* <PrimarySearchAppBar/> */}

        <h1>Welcome to StoriVault!</h1>
        <p>A place full of warewolf porn fantasy written by teen girls who dont shower</p>

        {/* <TextBox/> */}
        {/* i am a textbox for displayign chapter 1 of story 1 */}

        
        <PageLayout/>
      
        {/* <FloatingActionButtons/> */}
        {/* i am floating actionn buttons you will find when reading a story */}

      </motion.div>

      {/* notice the motion.div tags, you can set up how each element in the tag appears.
      i added this for better animations and ease of use. saves time for frontend team
      just simply put everything in one tag and thats it. */}

    </>
  )
}

export default App
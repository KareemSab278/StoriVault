import { motion } from 'framer-motion' // added in for simple and quick animations. no need for writing any yourself. saves hastle.
import './App.css'
import TextBox from './components/TextBox'

function App() {
  return (
    <>
      {/* fade in */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h1>Welcome to StoriVault!</h1>
        <p>fade in text example. This doesnt apply to just text. it applies to ANY component added under the tags</p>

        {/* <TextBox/> */}
        {/* i am a textbox for displayign chapter 1 of story 1 */}

      </motion.div>

      {/* notice the motion.div tags, you can set up how each element in the tag appears.
      i added this for better animations and ease of use. saves time for frontend team
      just simply put everything in one tag and thats it. */}

    </>
  )
}

export default App
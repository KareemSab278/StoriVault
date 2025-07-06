import { useState, useEffect, use } from "react";
import getChapter from "../../app";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { color } from "framer-motion";

export default function TextBox(){
  const [text, setText] = useState("");

  const [storyId, setStoryId] = useState('686a7301c6e0afc1fd327c3e');// youll get these later when user selects a story and then a chapter but it is only here now for testing
  const [chapterNumber, setChapterNumber] = useState(1);


  useEffect(() => {
    // get the text from calling get chapter funciton with getChapter('685c5596c5cf817cd3d809ba', 2);
    getChapter(storyId, chapterNumber).then(data => {
      if (data && data.content) setText(data.content);
      // then display the text raw into the box
        })
        }, []);
        
    //we could try to loop through the entire array of chapters and display each chapter in a separate textbox but i aint figure it out yet lol
    return (
    <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 2, width: '90%', height: '50%'} }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
            multiline
            minRows={20}
            value={text}
            onChange={(e) => setText(e.target.value)} // changes text when typed into but cirrently disabled by line below
            InputProps={{
              readOnly: true,
              style: {color: 'white'}
            }} // makes it uneditable
        />
      </div>
      
    </Box>
  );

}

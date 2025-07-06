
import TextBox from '../src/components/TextBox';
import { useState, useEffect } from "react";
import getChapter from '../app';

// In production, you would get these from props, context, or the router (e.g. React Router):
// import { useParams } from 'react-router-dom';
// const { storyId, chapter_number } = useParams();


const id = "686a7301c6e0afc1fd327c3e"; // REMOVE this in production
const selectedChapter = 1; // REMOVE this in production
// this mus also be changes iun the text box component


function ChapterPage(){
  const [text, setText] = useState("");

  const [storyId, setStoryId] = useState(id); // for testing only!
  const [chapter_number, setChapterNumber] = useState(selectedChapter); // for testing only
 
  useEffect(() => {
    getChapter(storyId, chapter_number).then(data => {
      if (data && data.content) setText(data.content);
    });
  }, [storyId, chapter_number]);



    return(
        <>
        <br />
        <h2>chapter {chapter_number} of story {storyId}</h2>

        <TextBox text={text} />
        </>
    )
}

export default ChapterPage;

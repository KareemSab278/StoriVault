const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // for use later when sending a new user but need to encrypt password! (refer to https://github.com/KareemSab278/ChatApp/blob/main/backend/app.js for example of bcrypt working)
const { User, Story, Review } = require('../models/Models');


//===================================== GET REQUEST =====================================//


router.get('/user', async (req, res) => { // http://localhost:5000/user
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/stories/:id', async (req, res) => { // http://localhost:5000/stories/685c5596c5cf817cd3d809ba
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.status(200).json(story);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/stories/:id/chapters', async (req, res) => { // http://localhost:5000/stories/685c5596c5cf817cd3d809ba/chapters
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        if ((story.chapters) && story.chapters.length > 0) { // this function prints all of the chapters' content in the console (run the url and check terminal in vscode)
            for(let i=0; i<story.chapters.length; i++){
                console.log(story.chapters[i].content);
            }
        }

        res.status(200).json(story.chapters);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.get('/stories/:id/chapters/:chapter_number', async (req, res) => { // http://localhost:5000/stories/685c5596c5cf817cd3d809ba/chapters/2
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        const chapter = story.chapters.find(
            c => c.chapter_number === parseInt(req.params.chapter_number)
        );
        
        if (!chapter) return res.status(404).json({ message: 'Chapter not found' });
        
        if (chapter.content) console.log(chapter.content) // this logs the chapter content in the terminal
        res.status(200).json(chapter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//===================================== POST REQUEST =====================================//


router.post('/post', async (req, res) => {
    try {
        const newSample = new Sample({ name: req.body.name }); // disregard this for now lol
        const saved = await newSample.save();
        res.json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// create a new user and hash the password then send it to the db using bcrypt.
// examples available on github (vera cleaning backend and chat app backend)


//===================================== DELETE REQUEST =====================================//



//====================================== PUT REQUEST =====================================//



module.exports = router;

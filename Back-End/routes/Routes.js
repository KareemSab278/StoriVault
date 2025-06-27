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


router.post('/new-user', async (req, res) => { // http://localhost:5000/new-user
    try{
        const { username, password, email, profile_picture, bio, created_at } = req.body;
        if (!username ) return res.status(400).json({ message: 'imagine trying to make an account with no username' });
        if (!password) return res.status(400).json({ message: 'so you just sleep with your house doors wide open?' });
        if (!email) return res.status(400).json({ message: 'who doesnt have an email? bruh' });

        // creating a new user and sending the info to the db
        //const hashedPassword = await bcrypt.hash(password, 10); // hashign the password so we cant be hacked by the IRS!!! (theyre watching me)
        const newUser = new User({ username, password: await bcrypt.hash(password, 10), email, profile_picture, bio, created_at }); // nvm you can save space by running it directly
        const savedUser = await newUser.save();
        // it worked!
        res.status(201).json(savedUser, "user created successfully");
    }
    catch(e){
        console.log(e, e.message); // it dindt work - you suck
    }    
})

// test data input for above endpoint: 
// {
//   "username": "testuser",
//   "password": "SecureP@ssw0rd!",
//   "email": "testuser@example.com",
//   "profile_picture": "https://example.com/pic.jpg",
//   "bio": "Just a test user.",
//   "created_at": "2025-06-27T12:00:00Z"
// }
// test data output for above endpoint:
// {
//     "_id": "685eb59574dd5f1871531f3e",
//     "username": "testuser",
//     "email": "testuser@example.com",
//     "password": "$2b$10$toVGZLBQpCLtEmiqVSRnZOGKUFOADTJGPesRPYUJ4Zvbnt60xyff6",
//     "profile_picture": "https://example.com/pic.jpg",
//     "bio": "Just a test user.",
//     "created_at": "2025-06-27T12:00:00.000Z",
//     "__v": 0
// }




//===================================== DELETE REQUEST =====================================//



//====================================== PUT REQUEST =====================================//



module.exports = router;

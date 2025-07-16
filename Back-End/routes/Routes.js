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

router.get('/user/:id', async (req, res) => { // http://localhost:5000/user/kareem
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
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

router.get('/stories', async (req, res) => { // http://localhost:5000/stories
    try {
        const stories = await Story.find({});
        res.status(200).json(stories);
    } catch{
        res.status(400).json({ message: error.message });
    };
})


router.get('/stories/:id/chapters', async (req, res) => { // http://localhost:5000/stories/685c5596c5cf817cd3d809ba/chapters
    try {
        const story = await Story.findById(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        if ((story.chapters) && story.chapters.length > 0) { // this function prints all of the chapters' content in the console (run the url and check terminal in vscode)
            for(let i=0; i<story.chapters.length; i++){
                // console.log(story.chapters[i].content);
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
        
        // if (chapter.content) console.log(chapter.content) // this logs the chapter content in the terminal
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

//=============================

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
        res.status(500).json({ message: e.message });
    }    
})

//=============================

router.post('/new-story', async (req, res) => { // http://localhost:5000/new-story
    try{
        const { user_id, username, story_title, description, cover_image, genres, created_at, updated_at, chapters } = req.body;
        let {status} = req.body; // so i can set it up as default draft

        if(!story_title) return res.status(400).json({ message: "'hey i read this mid story... blank???'" });
        if (!user_id) return res.status(400).json({ message: "user id required obviously how we gonna kow who wrote ts" });
        if (!username) return res.status(400).json({ message: "we get it. youre misterious" });
        if (!description) return res.status(400).json({ message: "do you even know what your story is about??" });
        if (!genres || genres.length === 0) return res.status(400).json({ message: "wow! a genderless story" });
        if (!status) status = "draft";
        

        const newStory = new Story({user_id, username, story_title, description, cover_image, status, genres, created_at, updated_at, chapters});
        const savedStory = await newStory.save();
        res.status(201).json({ message: "story created successfully", story: savedStory });
    }catch(e){
        console.log(e, e.message);
        res.status(500).json({ message: e.message });
    }
})


//=============================

router.post('/add-chapter/:storyId', async (req, res) => {
  try {
    const { storyId } = req.params;
    const { title, content, chapter_number } = req.body;

    if (!title || !content || !chapter_number) {
      return res.status(400).json({ message: "missing chapter fields" });
    }

    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: "story not found" });

    story.chapters.push({
      title,
      content,
      chapter_number,
      created_at: new Date(),
      updated_at: new Date()
    });

    story.updated_at = new Date();
    const updatedStory = await story.save();

    res.status(200).json(updatedStory);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "failed to add chapter" });
  }
});


//===================================== DELETE REQUEST =====================================//

router.delete('/user/:id', async (req, res) => { // http://localhost:5000/user/685eb59574dd5f1871531f3e
    try {
        const userId = req.params.id; // this is the id of the user we want to delete

        // Delete User
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); 

//=============================

router.delete('/stories/:id', async (req, res) => { // http://localhost:5000/stories/685c5596c5cf817cd3d809ba
    try {
        const storyId = req.params.id; // this is the id of the story we want to delete

        // Delete Story
        const deletedStory = await Story.findByIdAndDelete(storyId);
        if (!deletedStory) return res.status(404).json({ message: 'Story not found' });

        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//=============================

router.delete('/stories/:id/chapters/:chapter_number', async (req, res) => { // http://localhost:5000/stories/686a7301c6e0afc1fd327c3e/chapters/1
    try {
        const chapterId = req.params.id;
        const chapterNumber = parseInt(req.params.chapter_number);

        const deletechapter = await Story.findById(chapterId);
        if (!deletechapter) return res.status(404).json({ message: 'Story not found' });

        const chapterIndex = deletechapter.chapters.findIndex(c => c.chapter_number === chapterNumber);
        if (chapterIndex === -1) return res.status(404).json({ message: 'Chapter not found' });

        // Remove chapter
        deletechapter.chapters.splice(chapterIndex, 1);
        deletechapter.updated_at = new Date();

        const updatedStory = await deletechapter.save();
        res.status(200).json({ message: 'Chapter deleted successfully', deletechapter: updatedStory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
        

//====================================== PUT REQUEST =====================================//

// edit-story/:id
router.put('/update-story/:id', async (req, res) => {  // http://localhost:5000/update-story/686a7301c6e0afc1fd327c3e

    const storyId = req.params.id;
    const { story_title, description, genres} = req.body;
    
    try {
        const story = await Story.findById(storyId);
        if(!story_title, !description, !genres) return res.status(400).json({ message: "missing fields"});

        story.story_title = story_title;
        story.description = description;
        story.genres = genres;
        story.updated_at = new Date();

        await story.save();
        res.status(200).json({ message: "story updated successfully" });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

// {
//   "story_title": "The Last Horizon",
//   "description": "A journey beyond the stars.",
//   "genres": ["Sci-Fi", "Adventure"]
// }

//=============================

router.put('/stories/:id/chapters/:chapter_number', async (req, res) => { // http://localhost:5000/stories/686a7301c6e0afc1fd327c3e/chapters/1
    try {
        const storyId = req.params.id;
        const chapterNumber = parseInt(req.params.chapter_number);
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Missing title or content" });
        }

        const story = await Story.findById(storyId);
        if (!story) return res.status(404).json({ message: "Story not found" });

        const chapter = story.chapters.find(c => c.chapter_number === chapterNumber);
        if (!chapter) return res.status(404).json({ message: "Chapter not found" });

        chapter.title = title;
        chapter.content = content;
        chapter.updated_at = new Date();

        await story.save();
        res.status(200).json({ message: "Chapter updated successfully", chapter });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// {
//   "title": "Updated Chapter Title",
//   "content": "Updated chapter content goes here."
// }

//=============================

router.put('/user/:id', async (req, res) => { // http://localhost:5000/user/685c5539c5cf817cd3d809b4
    try {
        const userId = req.params.id;
        const { username, email, profile_picture, bio } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (username) user.username = username;
        if (email) user.email = email;
        if (profile_picture) user.profile_picture = profile_picture;
        if (bio) user.bio = bio;

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// {
//     "username": "Updated username",
//     "email": "Updated email.",
//     "profile_picture": "Updated profile picture.",
//     "bio": "Updated bio."
// }

//====================================== END =====================================//

module.exports = router;

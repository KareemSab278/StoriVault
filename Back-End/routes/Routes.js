const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // for use later when sending a new user but need to encrypt password! (refer to https://github.com/KareemSab278/ChatApp/blob/main/backend/app.js for example of bcrypt working)
const { User, Story, Review } = require("../models/Models");
const authMiddleware = require("../middleware/auth"); // impoet auth for use ltr
const jwt = require("jsonwebtoken");

//===================================== GET REQUEST =====================================//

router.get("/user", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get stories by username
router.get("/stories/user/:username", authMiddleware, async (req, res) => {
  try {
    const stories = await Story.find({ username: req.params.username });
    if (!stories || stories.length === 0)
      return res
        .status(404)
        .json({ message: "No stories found for this user" });
    res.status(200).json(stories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/username/:username", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/stories/:id", authMiddleware, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json(story);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/stories", async (req, res) => {
  try {
    const stories = await Story.find({});
    res.status(200).json(stories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/stories/:id/chapters", authMiddleware, async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    if (story.chapters && story.chapters.length > 0) {
      for (let i = 0; i < story.chapters.length; i++) {}
    }

    res.status(200).json(story.chapters);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get(
  "/stories/:id/chapters/:chapter_number",
  authMiddleware,
  async (req, res) => {
    try {
      const story = await Story.findById(req.params.id);
      if (!story) return res.status(404).json({ message: "Story not found" });
      const chapter = story.chapters.find(
        (c) => c.chapter_number === parseInt(req.params.chapter_number)
      );

      if (!chapter)
        return res.status(404).json({ message: "Chapter not found" });

      res.status(200).json(chapter);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get("/reviews/:storyId", authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find({ story_id: req.params.storyId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//===================================== POST REQUEST =====================================//

router.post("/new-user", async (req, res) => {
  try {
    const { username, password, email, profile_picture, bio, created_at } =
      req.body;
    if (!username)
      return res.status(400).json({
        message: "imagine trying to make an account with no username",
      });
    if (!password)
      return res.status(400).json({
        message: "so you just sleep with your house doors wide open?",
      });
    if (!email)
      return res
        .status(400)
        .json({ message: "who doesnt have an email? bruh" });

    const newUser = new User({
      username,
      password: await bcrypt.hash(password, 10),
      email,
      profile_picture,
      bio,
      created_at,
    });
    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "user created successfully", user: savedUser });
  } catch (e) {
    console.error(e, e.message);
    res.status(500).json({ message: e.message });
  }
});

//=============================

router.post("/new-story", authMiddleware, async (req, res) => {
  try {
    const {
      story_title,
      description,
      cover_image,
      genres,
      created_at,
      updated_at,
      chapters,
    } = req.body;
    let { status } = req.body;

    if (!story_title)
      return res
        .status(400)
        .json({ message: "'hey i read this mid story... blank???'" });
    if (!description)
      return res
        .status(400)
        .json({ message: "do you even know what your story is about??" });
    if (!genres || genres.length === 0)
      return res.status(400).json({ message: "wow!其中的故事" });
    if (!status) status = "draft";

    const newStory = new Story({
      user_id: req.user._id,
      username: req.user.username,
      story_title,
      description,
      cover_image,
      status,
      genres,
      created_at,
      updated_at,
      chapters,
    });
    const savedStory = await newStory.save();
    res
      .status(201)
      .json({ message: "story created successfully", story: savedStory });
  } catch (e) {
    console.error(e, e.message);
    res.status(500).json({ message: e.message });
  }
});

//=============================

router.post("/add-chapter/:storyId", authMiddleware, async (req, res) => {
  try {
    const { storyId } = req.params;
    const { title, content, chapter_number } = req.body;

    if (!title || !content || !chapter_number) {
      return res.status(400).json({ message: "missing chapter fields" });
    }

    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: "story not found" });

    if (story.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to modify this story" });
    }

    story.chapters.push({
      title,
      content,
      chapter_number,
      created_at: new Date(),
      updated_at: new Date(),
    });

    story.updated_at = new Date();
    const updatedStory = await story.save();

    res.status(200).json(updatedStory);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "failed to add chapter" });
  }
});

router.post("/new-review/:storyId", authMiddleware, async (req, res) => {
  try {
    const { username, stars, comment, created_at } = req.body;
    const existing = await Review.findOne({
      story_id: req.params.storyId,
      user_id: req.user._id,
    });
    if (existing) {
      return res
        .status(409)
        .json({ error: "You’ve already submitted a review for this story." });
    }
    const newReview = new Review({
      user_id: req.user._id,
      story_id: req.params.storyId,
      username,
      stars,
      comment,
      created_at,
    });
    const savedReview = await newReview.save();
    res
      .status(201)
      .json({ message: "Review created successfully", review: savedReview });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to create review" });
  }
});

//===================================== DELETE REQUEST =====================================//

router.delete("/user/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this user" });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//=============================

router.delete("/delete-story/:id", authMiddleware, async (req, res) => {
  try {
    const storyId = req.params.id;
    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: "Story not found" });
    if (story.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this story" });
    }

    await Story.findByIdAndDelete(storyId);
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//=============================

router.delete(
  "/delete-chapter/:id/:chapter_number",
  authMiddleware,
  async (req, res) => {
    try {
      const storyId = req.params.id;
      const chapterNumber = parseInt(req.params.chapter_number);

      const story = await Story.findById(storyId);
      if (!story) return res.status(404).json({ message: "Story not found" });

      if (story.user_id.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "You are not authorized to modify this story" });
      }

      const chapterIndex = story.chapters.findIndex(
        (c) => c.chapter_number === chapterNumber
      );
      if (chapterIndex === -1)
        return res.status(404).json({ message: "Chapter not found" });

      story.chapters.splice(chapterIndex, 1);
      story.updated_at = new Date();

      const updatedStory = await story.save();
      res.status(200).json({
        message: "Chapter deleted successfully",
        story: updatedStory,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

//====================================== PUT REQUEST =====================================//

router.put("/update-story/:id", authMiddleware, async (req, res) => {
  try {
    const storyId = req.params.id;
    const { story_title, description, genres } = req.body;

    const story = await Story.findById(storyId);
    if (!story) return res.status(404).json({ message: "Story not found" });

    if (story.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to modify this story" });
    }

    if (!story_title || !description || !genres)
      return res.status(400).json({ message: "missing fields" });

    story.story_title = story_title;
    story.description = description;
    story.genres = genres;
    story.updated_at = new Date();

    await story.save();
    res.status(200).json({ message: "story updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//=============================

router.put(
  "/edit-chapter/:storyId/:chapterNumber",
  authMiddleware,
  async (req, res) => {
    try {
      const storyId = req.params.storyId;
      const chapterNumber = parseInt(req.params.chapterNumber);
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ message: "Missing title or content" });
      }

      const story = await Story.findById(storyId);
      if (!story) return res.status(404).json({ message: "Story not found" });

      if (story.user_id.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "You are not authorized to modify this story" });
      }

      const chapter = story.chapters.find(
        (c) => c.chapter_number === chapterNumber
      );
      if (!chapter)
        return res.status(404).json({ message: "Chapter not found" });

      chapter.title = title;
      chapter.content = content;
      chapter.updated_at = new Date();

      await story.save();
      res
        .status(200)
        .json({ message: "Chapter updated successfully", chapter });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

//=============================

router.put("/edit-user/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this user" });
    }

    const { username, email, profile_picture, bio } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!(username || email || profile_picture || bio)) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.profile_picture = profile_picture || user.profile_picture;
    user.bio = bio || user.bio;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//====================================== USER AUTH sign in and login =====================================//

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "missing username or password" });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // generating a jwt token for this user
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    ); // token expires in 1 hour

    // setting the token in a cookie
    res.cookie("token", token, {
      httpOnly: true, // this makes the cookie inaccessible to js (helps prevent XSS attacks)
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "Strict", // this helps prevent CSRF attacks???
      // httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 60 * 60 * 1000,

      // CSRF (Cross-Site Request Forgery): An attack where a malicious site tricks a user’s browser into sending unauthorized requests to your server.
      // How sameSite: 'Strict' helps: It ensures the cookie is only sent for requests originating from your site (e.g., http://localhost:3000). Requests from other domains (e.g., a malicious site) won’t include the cookie, preventing CSRF.
      // Why it’s safe here: Since the JWT is in an HttpOnly cookie (not accessible by JavaScript) and sameSite: 'Strict', it’s protected against both XSS (via HttpOnly) and CSRF (via sameSite).
    });

    res
      .status(200)
      .json({ message: "Login successful", user: user.username, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/auth/status", async (req, res) => {
  // /auth/status
  try {
    const token = req.cookies.token; // get the token from the cookie
    if (!token)
      return res.status(401).json({ message: "Unauthorized - no token found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - bad token" });

    const user = await User.findById(decoded.id).select("-password"); // find by user id and dont need password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ message: "Unauthorized - invalid or expired token" });
  }
});

//====================================== END =====================================//

module.exports = router;

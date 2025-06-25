const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  chapter_number: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const storySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  username: { type: String, required: true },
  story_title: { type: String, required: true },
  description: String,
  cover_image: String,
  status: { type: String, enum: ['draft', 'published', 'completed'], default: 'draft' },
  genres: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  chapters: [chapterSchema] // add the chapter to the story in an embedded array (i thought i could simply just add it together under storyChema lol)
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile_picture: String,
  bio: String,
  created_at: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
  story_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Story' },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  username: { type: String, required: true },
  stars: { type: Number, required: true, min: 0, max: 5 },
  comment: String,
  created_at: { type: Date, default: Date.now }
});
reviewSchema.index({ story_id: 1, user_id: 1 }, { unique: true }); // this enfirces that only 1 user can have only 1 review per story id.



// export all schemas
module.exports = {
  User: mongoose.model('User', userSchema),
  Story: mongoose.model('Story', storySchema),
  Review: mongoose.model('Review', reviewSchema)
};

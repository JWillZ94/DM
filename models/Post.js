const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  video_url: {
    type: String
  },
  video_thumbnail: {
    type: String
  },
  post_date: {
    type: String,
    required: true
  },
  last_update: {
    type: String,
    required: true
  }
});

const Post = module.exports = mongoose.model('Post', postSchema);

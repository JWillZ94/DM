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
  post_date: {
    type: Date,
    required: true
  },
  last_update: {
    type: Date,
    required: true
  }
});

const Post = module.exports = mongoose.model('Post', postSchema);

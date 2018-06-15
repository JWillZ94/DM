const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
Post = require('../models/Post');

router.get('/', (req, res) => {
  Post.find((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

module.exports = router;

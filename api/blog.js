const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
Post = require('../models/Post');

router.get('/', (req, res) => {
  res.render('blog');
});

router.get('/api/posts', (req, res) => {
  Post.find((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.get('/api/posts/:id', (req, res) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) throw err;
    res.json(post);
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
Post = require('../models/Post');

router.get('/', (req, res) => {
  res.render('blog');
});

router.get('/articles', (req, res) => {
  Post.find((err, posts) => {
    if (err) throw err;
    res.json(posts);
  });
});

router.get('/article/:title', (req, res) => {
  res.render('article');
});

router.get('/article', (req, res) => {
  Post.findOne(req.body.title, (err, post) => {
    if (err) throw err;
    res.json(post);
  });
});

module.exports = router;

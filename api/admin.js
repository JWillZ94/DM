const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
Post = require('../models/Post');

router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    res.render('admin', { posts: posts });
  });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, {}, (err, post) => {
    if (err) throw err;
    res.render('adminPost', { post: post });
  });
});

router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id, {}, (err, post) => {
    if (err) throw err;
    res.render('edit', { post: post });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
Post = require('../models/Post');

router.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    res.render('blog', { posts: posts });
  });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, {}, (err, post) => {
    if (err) throw err;
    res.render('post', { post: post });
  });
});

router.post('/', (req, res) => {
  Post.create(req.body, (err, post) => {
    if (err) throw err;
    res.redirect('/admin');
  });
});

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) throw err;
    res.json(post);
  });
});

router.delete('/:id', (req, res) => {
  Post.findByIdAndDelete(req.params.id, req.body, (err, post) => {
    if (err) throw err;
    res.json(post);
  });
});

module.exports = router;

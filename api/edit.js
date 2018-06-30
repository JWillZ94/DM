const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
Post = require('../models/Post');

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, {}, (err, post) => {
    if (err) throw err;
    res.render('edit', { post: post });
  });
});

router.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    post.title = req.body.title;
    post.content = req.body.content;
    post.last_update = req.body.last_update;
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

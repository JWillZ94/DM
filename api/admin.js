const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const moment = require('moment');
Post = require('../models/Post');

router.get('/', (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    next();
  } else {
    res.render('login');
  }
}, (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) throw err;
    res.render('admin', {
      posts: posts,
      moment: moment
    });
  });
});

router.get('/:id', (req, res) => {
  Post.findById(req.params.id, {}, (err, post) => {
    if (err) throw err;
    res.render('adminPost', {
      post: post,
      moment: moment
    });
  });
});

router.get('/:id/edit', (req, res) => {
  Post.findById(req.params.id, {}, (err, post) => {
    if (err) throw err;
    res.render('edit', { post: post });
  });
});

module.exports = router;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware ==================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database ====================================

Post = require('./models/Post');
mongoose.connect('mongodb://localhost/dm');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('db connected');
});

// Routes ======================================

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/services', (req, res) => {
  res.render('services');
});

app.get('/work', (req, res) => {
  res.render('work');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

// API ===========================================

let blog = require('./api/blog');
app.use('/blog', blog);

let admin = require('./api/admin');
app.use('/admin', admin);

let edit = require('./api/edit');
app.use('/edit', edit);

// Server ========================================

app.listen(process.env.PORT || 3000, () => {
  console.log('server connected');
});

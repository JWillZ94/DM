const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

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

app.get('/blog', (req, res) => {
  res.render('blog');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server connected');
});

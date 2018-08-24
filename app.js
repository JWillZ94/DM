const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

// Middleware ==================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database ====================================

Post = require('./models/Post');
mongoose.connect('mongodb://JWillZ94:104280Jw@ds139331.mlab.com:39331/jamani-blog-posts');
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

// NodeMailer ====================================

app.post('/api/contact', (req, res) => {

  const transporter = nodemailer.createTransport({
    secure: false,
    service: 'gmail',
    port: 25,
    auth: {
      user: 'jerelwilliams94@gmail.com',
      pass: '104280Jw'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.verify((err, success) => {
    return err
      ? console.log("dis a verification error: " + err)
      : console.log("server is ready to receive messages");
  });

  const mailOptions = {
    from: req.body.name + " " + req.body.email,
    to: 'jerelwilliams94@gmail.com',
    subject: 'Message from the call to action on the main site',
    html: `
      <p>${req.body.name} (${req.body.email}) says:</p>
      <p>${req.body.msg}</p>
      <p>I've heard about your business from ${req.body.source}.</p>
      <p>My phone number is ...${req.body.phone_number}.</p>
      <p>The best time to reach me is ${req.body.best_time}.</p>
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    return err
      ? console.log("This right here, is an error: " + err)
      : console.log("Email sent: " + info.response);
  });

  res.redirect("/");

});

// Server ========================================

app.listen(process.env.PORT || 3000, () => {
  console.log('server connected');
});

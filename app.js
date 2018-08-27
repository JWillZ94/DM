const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
info = require('./secret');

const app = express();

// Middleware ==================================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database ====================================

Post = require('./models/Post');
mongoose.connect(info.db);
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

// OAuth2 ========================================

const oauth2Client = new OAuth2(
  info.clientId,
  info.clientSecret,
  "https://developers.google.com/oauthplayground/"
);

oauth2Client.setCredentials({
  refresh_token: info.refreshToken
});

let accessToken = '';

oauth2Client.refreshAccessToken((err, tokens) => {
  accessToken = tokens.access_token;
});

// NodeMailer ====================================

app.post('/api/contact', (req, res) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: info.user,
      clientId: info.clientId,
      clientSecret: info.clientSecret,
      refreshToken: info.refreshToken,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.verify((err, success) => {
    return err
      ? console.log("There is a verification error: " + err)
      : console.log("Server is ready to receive messages");
  });

  const mailOptions = {
    from: req.body.name,
    to: info.to,
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

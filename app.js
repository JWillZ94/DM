const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

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

// OAuth2 ========================================

const oauth2Client = new OAuth2(
  "403214791414-p568br9loi404q570ioen4h4hem3ar9r.apps.googleusercontent.com",
  "Dhc8L0PQeGcEToHK_Em4sAUr",
  "https://developers.google.com/oauthplayground/"
);

oauth2Client.setCredentials({
  refresh_token: "1/u5WTLQRpx53H0ZiANX_Nc6NuBXkBbPbtfrvHiG7Kezk"
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
      user: 'jerelwilliams94@gmail.com',
      clientId: '403214791414-p568br9loi404q570ioen4h4hem3ar9r.apps.googleusercontent.com',
      clientSecret: 'Dhc8L0PQeGcEToHK_Em4sAUr',
      refreshToken: '1/u5WTLQRpx53H0ZiANX_Nc6NuBXkBbPbtfrvHiG7Kezk',
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  transporter.verify((err, success) => {
    return err
      ? console.log("Dis a verification error: " + err)
      : console.log("server is ready to receive messages");
  });

  const mailOptions = {
    from: req.body.name,
    to: 'jamaniskeete43@gmail.com',
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

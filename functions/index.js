// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'jade')
app.set('views','./views');

require('./controllers/index.controller')(app);
require('./controllers/search.controller')(app);
require('./controllers/register.controller')(app);
require('./controllers/boothmanagement.controller')(app);

require('./controllers/dev-register.controller')(app);
require('./controllers/randomround.controller')(app);
require('./controllers/dev-boothdetail.controller')(app);


app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
});

app.get('/timestamp-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=3000, s-maxage=6000');
  response.send(`${Date.now()}`);
});

exports.app = functions.https.onRequest(app);

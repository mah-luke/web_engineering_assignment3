/**
 * This module registers all the application logic
 * Use this file to register the routes you implemented.
 */

'use strict';

const express = require('express');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const FileStore = require('session-file-store')(session);
const NanoId = require('nanoid');

const artworkRoutes = require('./routes/artworks');
const matsRoutes = require('./routes/mats');
const cartRoutes = require('./routes/cart');
const framesRoutes = require('./routes/frames');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(session({
  genid: (req) => {
    console.log(`method: ${req.method}, baseUrl: ${req.path}`);
    if (req.method == 'GET' && req.path == '/cart') {
      console.log(`in GET Cart --> creating id`);
      return NanoId.nanoid();
    }
  },
  cookie: {
    path: '/cart',
    httpOnly: false
  },
  name:'sessionId',
  secret: '1234',
  saveUninitialized: false,
  resave: false,
  // store:new FileStore()
}))

// Register the modules containing the routes
app.use('/artworks', artworkRoutes);
app.use('/mats', matsRoutes);
app.use('/cart', cartRoutes);
app.use('/frames', framesRoutes);

app.use((req,res,next) => {
  res.sendStatus(404);
});

module.exports = app;

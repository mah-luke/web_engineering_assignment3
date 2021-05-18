/**
 * This module registers all the application logic
 * Use this file to register the routes you implemented.
 */

'use strict';

const express = require('express');
require('express-async-errors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const NanoId = require('nanoid');

const artworkRoutes = require('./routes/artworks');
const matsRoutes = require('./routes/mats');
const cartRoutes = require('./routes/cart');
const framesRoutes = require('./routes/frames');
const shippingRoutes = require('./routes/shipping');

const proxyBlingApi = require("./services/proxyBlingApi.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(session({
  genid: (req) => {
    console.log(`method: ${req.method}, baseUrl: ${req.path}`);
    if (req.method == 'GET' && req.path == '/cart' && !req.cookies['sessionId']) {
      console.log(`No sessionId on GET /cart Endpoint --> creating new id`);
      return NanoId.nanoid();
    }
    else if (req.method == 'POST' && req.path == '/cart/checkout/payment-update') {
      return proxyBlingApi.getCache(req.body.paymentintent.id);
    }
    else {
      console.log(`Invalid sessionId or no sessionId on enpoint other than GET /cart marking session as failed!`);
      return null;
    }
  },
  cookie: {
    path: '/cart',
    httpOnly: false
  },
  name:'sessionId',
  secret: NanoId.nanoid(),
  saveUninitialized: false,
  resave: false,
}));

// Register the modules containing the routes
app.use('/artworks', artworkRoutes);
app.use('/mats', matsRoutes);
app.use('/cart', cartRoutes);
app.use('/frames', framesRoutes);
app.use('/shipping', shippingRoutes);

app.use((req,res,next) => {
  res.sendStatus(404);
});

module.exports = app;

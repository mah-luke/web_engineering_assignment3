/**
 * This module contains the routes under /cart
 */

 'use strict';

 const express = require('express');
 const CartItem = require('../models/cartItem.js');
 const routes = express.Router();

 const CartStorage = require('../services/cartStorage');
 // const fs = require('fs');
 // const path = require('path');
 
 routes.get('/', async (req, res) => {
    console.log(`GET /cart/`);

    console.log(req.sessionID);
    if (!req.sessionID) res.sendStatus(403);
    else {
       if (!req.session.carts) req.session.carts = [];

      console.log(req.session.carts);
      res.send(req.session.carts.filter(val => val != null));
    }
 });

 routes.post('/', async (req, res) => {
    console.log(`POST /cart/`);
    console.log(`sessionId: ${req.sessionID}`);
   
    if (!req.sessionID) res.sendStatus(403);
    else {
      console.log(req.session.carts);

      let toValidate = req.body;
      toValidate.cartItemId = req.session.carts.length;

      try {
         let validatedCartItem = validateCartItem(toValidate);
         req.session.carts.push(validatedCartItem);
         res.sendStatus(201);
      } catch ( e ) {
         console.error(e);
         res.send(e);
      } 
    }
 });

 routes.delete('/', async (req, res) => {
    console.log(`DELETE /cart`);

    if (!req.sessionID) res.sendStatus(403);
    else {
          req.session.carts = [];
          res.sendStatus(204);
    }
 });
 
 routes.get('/:id', async (req, res) => {
    console.log(`GET /cart/:id`);
   
    let id = parseInt(req.params.id);

    if (!req.sessionID) res.sendStatus(403);
    else if (!req.session.carts || req.session.carts.length <= id || id < 0 || req.session.carts[id] == null) 
      res.sendStatus(404);
    else res.send(req.session.carts[id]);
 });

 routes.delete('/:id', async (req, res) => {
    console.log(`DELETE /cart/:id`);

    let id = parseInt(req.params.id);

    if (!req.sessionID) res.sendStatus(403);
    else if (!req.session.carts || req.session.carts.length <= id || id < 0 || req.session.carts[id] == null) 
      res.sendStatus(404);
    else {
       req.session.carts[parseInt(req.params.id)] = null;
       res.sendStatus(204);
    }
 });

 function validateCartItem(toVal) {
    console.log(`validate item ${toVal}`);
    console.log(toVal);

   //  let errorObj = {"message" : "Validation failed"};

   //  throw new Error(errorObj);

   //  if (!parseInt(toVal.artworkId));

    let newCartItem = new CartItem(
      toVal.cartItemId,
      toVal.printSize,
      toVal.artworkId,
      toVal.frameStyle,
      toVal.frameWidth,
      toVal.matColor,
      toVal.matWidth
   );

   return newCartItem;
 }

 module.exports = routes;
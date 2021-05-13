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
    else if (!req.session.carts) req.session.carts = [];

    console.log(req.session.carts);
    res.send(req.session.carts.filter(val => val != null));
 });

 routes.post('/', async (req, res) => {
    console.log(`POST /cart/`);
    console.log(`sessionId: ${req.sessionID}`);
   
    if (!req.sessionID) res.sendStatus(403);
    else {

       if (req.body) {
          console.log(req.session.carts);
          console.log(req.body);

          // TODO: implement validation --> throw 400 if not working
          let newCartItem = new CartItem(
            req.session.carts.length,
            req.body.printSize,
            req.body.artworkId,
            req.body.frameStyle,
            req.body.frameWidth,
            req.body.matColor,
            req.body.matWidth
         )
         console.log(newCartItem);
          req.session.carts.push(newCartItem);
         res.sendStatus(201); 
      } 
       else res.sendStatus(400); // TODO: implement dictionary of errors
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
     //TODO: implement get
    // implement send specific cart item
    console.log(`GET /cart/:id`);
   
    let id = parseInt(req.params.id);

    if (!req.sessionID) res.sendStatus(403);
    else if (!req.session.carts || req.session.carts.length <= id || id < 0 || req.session.carts[id] == null) 
      res.sendStatus(404);
    else res.send(req.session.carts[id]);
 });

 routes.delete('/:id', async (req, res) => {
    // TODO: implement delete
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

 module.exports = routes;
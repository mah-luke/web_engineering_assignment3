/**
 * This module contains the routes under /cart
 */

 'use strict';

 const express = require('express');
 const routes = express.Router();

 const cartStorage = require('../services/cartStorage.js');
 // const fs = require('fs');
 // const path = require('path');
 
 routes.get('/', async (req, res) => {
    console.log(`GET /cart/`);

   // console.log(req.session);
   // console.log(`sessionId: ${req}`)

     console.log(req.sessionID);

     if (!req.session.carts) {
         req.session.carts = [];
     } 
     else {
         console.log(`Using sessionId: ${req.sessionID}`);
         // TODO: implement check for valid
      }
      res.send(req.session.carts);
 });

 routes.post('/', async (req, res) => {
    console.log(`POST /cart/`);
    console.log(`sessionId: ${req.sessionID}`);
   
    if (!req.sessionID) res.sendStatus(403);
    else {
       let cart = req.body;

       // TODO: write validation
       if (cart) {
         req.session.carts.push(cart);
         res.sendStatus(201); 
      } 
       else res.sendStatus(400); // TODO: implement dictionary of errors
    }
 });

 routes.delete('/', async (req, res) => {
    // TODO: implement delete
    console.log(`DELETE /cart/`);

    let sessionId = req.cookies[COOKIE];

    if (!sessionId) res.sendStatus(403);
    else {
       res.cookie(COOKIE, sessionId, {path: "/cart"});

       if (!cartStorage.getCarts)

       cartStorage.setCarts(sessionId, null); // TODO: Implement deletion not only null setting
       res.sendStatus(204);
    }
 });
 
 routes.get('/:id', async (req, res) => {
     //TODO: implement get
    // implement send specific cart item
 });

 routes.delete('/;id', async (req, res) => {
    // TODO: implement delete
 });

 module.exports = routes;
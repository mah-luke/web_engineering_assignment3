/**
 * This module contains the routes under /cart
 */

 'use strict';

 const express = require('express');
 const routes = express.Router();

 const cartStorage = require('../services/cartStorage.js');
 // const fs = require('fs');
 // const path = require('path');

//  const COOKIE = 'sessionId';

//  cartStorage.setCarts('dummyId', [{'test':'testVal'}]);
 
 routes.get('/', async (req, res) => {

   // console.log(req.session);
   // console.log(`sessionId: ${req}`)

   //   let sessionId = req.cookies[COOKIE];
     let sessId = req.sessionID;
     console.log(sessId);

     if (!req.session.carts) {
         console.log(`Creating new SessionId`);

         // res.cookie(COOKIE, NanoId.nanoid(), {path: "/cart"});
         req.session.carts = [];
         console.log(req.session);
         res.send(req.session.carts);
     } 
     else {
         console.log(`Using sessionId: ${sessId}`);
         
      //   res.cookie(COOKIE, sessionId, {path: "/cart"});

         let carts = cartStorage.getCarts(sessId);
         console.log(carts);

         if(carts) res.send(carts);
         else res.send([]);
     }
     

     // implement return cart for sessionID
 });

 routes.post('/', async (req, res) => {
    // TODO: implement post
    console.log(`POST /cart/`);

    let sessId = req.sessionID;
    console.log(`sessionId: ${sessId}`);
   
    if (!sessId) res.sendStatus(403);
    else {
      //  res.cookie(COOKIE, sessId, {path: "/cart"});

       let cart = req.body;
       let response = cartStorage.setCart(sessId, cart);

       if (response == 0) res.sendStatus(201);
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
/**
 * This module contains the routes under /cart
 */

 'use strict';

 const express = require('express');
 const routes = express.Router();
 const NanoId = require('nanoid');
 const cartStorage = require('../services/cartStorage.js');
 // const fs = require('fs');
 // const path = require('path');

 const COOKIE = 'sessionId';

 cartStorage.setCarts('dummyId', [{'test':'testVal'}]);
 
 routes.get('/', async (req, res) => {

     let sessionId = req.cookies[COOKIE];

     if (!sessionId) {
         console.log(`Creating new SessionId`);

         res.cookie(COOKIE, NanoId.nanoid(), {path: "/cart"});
         res.send([]);
     } 
     else {
         console.log(`Using sessionId: ${sessionId}`);
         
         res.cookie(COOKIE, sessionId, {path: "/cart"});

         let carts = cartStorage.getCarts(sessionId);
         console.log(carts);

         if(carts) res.send(carts);
         else res.sendStatus(403);
     }
     

     // implement return cart for sessionID
 });

 routes.post('/', async (req, res) => {
    // TODO: implement post
    console.log(`POST /cart/`);

    let sessionId = req.cookies[COOKIE];
   
    if (!sessionId) res.sendStatus(403);
    else {
       res.cookie(COOKIE, sessionId, {path: "/cart"});

       let cart = req.body;
       let response = cartStorage.setCart(sessionId, cart);

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
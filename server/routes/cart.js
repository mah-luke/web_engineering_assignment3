/**
 * This module contains the routes under /cart
 */

 'use strict';

 const express = require('express');
 const routes = express.Router();
 const cartItemValidation = require('../services/cartItemValidation');
 const BlingApi = require('../services/proxyBlingApi.js');
 const billings = require("../models/billings.js");
 const order = require('../utils/order');
 const Cache = require('node-cache');

 const cache = new Cache();
 // const fs = require('fs');
 // const path = require('path');
 
 routes.get('/', async (req, res) => {
    console.log(`GET /cart/ for session: ${req.sessionID}`);

    if (!req.sessionID) res.sendStatus(403);
    else {
      if (!req.session.carts) req.session.carts = [];
      res.send(req.session.carts.filter(val => val != null));
    }
 });

 routes.post('/', async (req, res) => {
    console.log(`POST /cart/ for session: ${req.sessionID}`);
   
    if (!req.sessionID) res.sendStatus(403);
    else {
      let toValidate = req.body;
      toValidate.cartItemId = req.session.carts.length;

      let validationResult = cartItemValidation.validateCartItem(toValidate);

      if(validationResult.errors) res.status(400).send(validationResult);
      else {
         req.session.carts.push(validationResult);
         res.sendStatus(201);
      }
    }
 });

 routes.delete('/', async (req, res) => {
    console.log(`DELETE /cart for session: ${req.sessionID}`);

    if (!req.sessionID) res.sendStatus(403);
    else {
      req.session.carts = [];
      res.sendStatus(204);
    }
 });
 
 routes.get('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    console.log(`GET /cart/${id} for session: ${req.sessionID}`);

    if (!req.sessionID) res.sendStatus(403);
    else if (!req.session.carts || req.session.carts.length <= id || id < 0 || req.session.carts[id] == null) 
      res.sendStatus(404);
    else res.send(req.session.carts[id]);
 });

 routes.delete('/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    console.log(`DELETE /cart/${id} for session: ${req.sessionID}`);

    if (!req.sessionID) res.sendStatus(403);
    else if (!req.session.carts || req.session.carts.length <= id || id < 0 || req.session.carts[id] == null) 
      res.sendStatus(404);
    else {
       req.session.carts[id] = null;
       res.sendStatus(204);
    }
 });

 routes.post('/checkout', async (req, res) =>  {
    console.log(`POST /cart/checkout for session: ${req.sessionID}`)
    
    if (!req.sessionID) res.sendStatus(403);

    else if (req.session.carts.length === 0) res.sendStatus(400);
    else {
       let price = 0;
       for (var i = 0; i<req.session.carts.length; i++){
         price += req.session.carts[i].price;
       }
      //  req.session.carts.foreach(val => price += val);

       if (Object.keys(req.body).includes('email')){
          if(Object.keys(req.body).includes('shipping_address')){
            const neededKeys = ['name', 'address', 'city', 'country', 'postal_code'];
            if(neededKeys.every(key => Object.keys(req.body.shipping_address).includes(key))) {
               let bling_res = await BlingApi.postPaymentIntent(price);
               console.log(bling_res);

               let newBilling = {
                  email: req.body.email,
                  shipping_address: req.body.shipping_address,
                  order: bling_res,
                  sessionId: req.sessionID,
                  request: req.body,
                  cart: req.session.carts,
                  payment_state: null
              };

              cache.set(bling_res.payment_intent_id, newBilling);
              BlingApi.setCache(bling_res.payment_intent_id, req.sessionID);
               res.send(bling_res);
               
            } else {
               res.sendStatus(400);
            }
          } else{
            res.sendStatus(400);
          }
       } else{
          res.sendStatus(400);
       }
    }
 });

 routes.post('/checkout/payment-update', async (req, res) => {
   console.log(`GET /cart/checkout/payment-update for session: ${req.sessionID}`);
   let body = req.body;
   let {payment_intent} = body;
   let billing = cache.get(payment_intent.id);

   if(body.type !== "payment.succeeded") {
      res.sendStatus(204);
      return;
   }

   if(!Object.keys(body.payment_intent).includes('card')){
      res.sendStatus(400);
      return;
   }

   //let cart = billing.cart;
   let cart = req.session.carts;
   cart.forEach(element => {
      delete element.cartItemId
   });
   let receipt = order.mapOrder(billing.request, body, cart);
   order.writeOrder(receipt);
   req.session.carts = [];
   res.sendStatus(204);
   
 });

 module.exports = routes;
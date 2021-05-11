/**
 * This module contains the routes under /cart
 */

 'use strict';

 const express = require('express');
 const routes = express.Router();
 const Cache = require('node-cache');
 // const fs = require('fs');
 // const path = require('path');
 
 routes.get('/', async (req, res) => {
     //TODO: implement get
     // implement send sessionID

     // implement return cart for sessionID
 });

 routes.post('/', async (req, res) => {
    // TODO: implement post
 });

 routes.delete('/', async (req, res) => {
    // TODO: implement delete
 });
 
 routes.get('/:id', async (req, res) => {
     //TODO: implement get
    // implement send specific cart item
 });

 routes.delete('/;id', async (req, res) => {
    // TODO: implement delete
 });

 module.exports = routes;
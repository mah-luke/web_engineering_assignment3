'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');

const destinationsParse = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/destinations.json')));
const destinations = destinationsParse.map(x => ({ country: x.country, displayName: x.displayName, cost: x.cost}));

const routes = express.Router();

routes.get('/', (req, res) => {
  res.sendStatus(101);
});

module.exports = routes;
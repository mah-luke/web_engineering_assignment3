'use strict';

const express = require('express');
const routes = express.Router();
const path = require('path');
const fs = require('fs');

const framesParse = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/frames.json')));
const frames = framesParse.map(x => ({ style: x.id, label: x.label, slice : x.border.slice, cost: x.cost}));

routes.get('/', async (req, res) => {
    res.send(frames);
 });

module.exports = routes;
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

routes.get('/:style/:imageType', async (req, res) => {
    let style = req.params.style;
    let imageType = req.params.imageType;
    let save = null;
    console.log(Object.keys(framesParse).length);
    res.sendStatus(200);

  /*  for (x in framesParse) {
        if (x.id === style) {
            save = x.id;
        }
    }
    if (!save) {
        res.sendStatus(404);
    } else {

    } */
})

module.exports = routes;
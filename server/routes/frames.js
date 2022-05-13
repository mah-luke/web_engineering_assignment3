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

    let frame = framesParse.filter(val => val.id == style)[0];

    if(!frame || !(imageType === 'thumbImage' || imageType === 'borderImage')) {
        res.sendStatus(404);
    } else {  
        if (imageType === 'thumbImage'){
            res.sendFile(path.join(__dirname, '../resources/' + frame.image));
        } else if (imageTypeType === 'borderImage'){
            res.sendFile(path.join(__dirname, '../resources/' + frame.border.image));
        }
    }
})

function getFrames() {
    return frames;
}


module.exports.routes = routes;
module.exports.getFrames = getFrames;
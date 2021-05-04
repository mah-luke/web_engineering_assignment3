/**
 * This module contains the routes under /artworks
 */

'use strict';

const express = require('express');
const routes = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const highlights = require('../resources/highlights.json');
const Artwork = require('../models/artwork.js');

const MET_BASE_URL = 'http://collectionapi.metmuseum.org/public/collection/v1';

async function getArtwork(id) {
  console.log(`call getArtwork(${id})`);
  console.log(`fetching ${MET_BASE_URL + '/objects/' + id}`);
  const res = await fetch(MET_BASE_URL + '/objects/' + id);

  if (!res.ok) {
    console.log("response from met-api not ok");
    return null;
  }
  const obj = await res.json();
  if (!obj || !obj.objectID) {
    console.log("response from met-api not an object");
    return null;
  }

  console.log("creating artwork for return");
  // TODO: convert Met object - done?
  let artwork = new Artwork (
    obj.objectID,
    obj.title,
    obj.artistDisplayName,
    obj.objectDate,
    obj.primaryImageSmall
  )

  console.log(`artwork: ${JSON.stringify(artwork)}`);
  return artwork;
}

routes.get('/', async (req, res) => {
  if (req.query.q == null) {
    // TODO: return highlights -done?
    let artworks = [];

    // highlights.highlights.forEach(id => {
    //   console.log(id);
    //   getArtwork(id);
    // });

    let highlightIds = highlights.highlights;

    let actions = highlightIds.map(getArtwork);

    let results = Promise.all(actions);

    console.log(results);

    results.then(results => {
      console.log(results);
      res.send(results)
    });
    //console.log(actions.forEach(el => console.log(el)));

    // Promise.all(highlights.highlights.map(getArtwork)).then(

    // )


    // for (let highlightId of highlights.highlights) {
    //   getArtwork(highlightId).then( result => {
    //     console.log(`working on artwork: ${JSON.stringify(result)}`);
    //     console.log(result);
    //     artworks.push(result);
    //   })
    // }


  } else {
    // TODO: search for artworks
    res.send();
  }
});

routes.get('/:id', async (req, res) => {
  const artwork = await getArtwork(parseInt(req.params.id));
  if (artwork) {
    res.send(artwork);
  } else {
    res.sendStatus(404);
  }
});

module.exports = routes;

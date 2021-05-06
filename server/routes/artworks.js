/**
 * This module contains the routes under /artworks
 */

'use strict';

const express = require('express');
const routes = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const cache = require('node-cache');


const highlights = require('../resources/highlights.json');
const Artwork = require('../models/artwork.js');

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

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

async function getSearch(searchParam) {
  console.log(`call getSearch(${searchParam})`);
  console.log(`fetch via ${MET_BASE_URL + '/search?q=' + searchParam}`);
  const res = await fetch(MET_BASE_URL + '/search?q=' + searchParam);

  if (!res.ok) {
    return null;
  }

  const obj = await res.json();
  console.log(obj);
  
  if(!obj) {
    console.log("no obj or objID");
    return null;
  }

  console.log(obj);

  console.log('returning objectIds: ')
  console.log(obj.objectIDs);

  return obj.objectIDs;

}

routes.get('/', async (req, res) => {
  if (req.query.q == null) {
    // TODO: return highlights -done?
    let artworks = [];

    let highlightIds = highlights.highlights;
    console.log(highlightIds);

    let actions = highlightIds.map(getArtwork);
    console.log(actions);

    let results = Promise.all(actions);
    console.log(results);

    results.then(results => {
      console.log(results);
      res.send(results)
    });

  } else {
    // TODO: search for artworks

    let searchIds = await getSearch(req.query.q);

    if (searchIds) {
      searchIds = searchIds.slice(0,100);
      console.log(searchIds);
  
      let actions = searchIds.map(getArtwork);
      console.log(actions);
  
      let results = Promise.all(actions);
      console.log(results);
  
      results.then(results => {
        console.log(results);
        res.send(results);
      });

    }
    else {
      console.log(`no result for search '${req.query.q}'`);
      res.send([]);
    }
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

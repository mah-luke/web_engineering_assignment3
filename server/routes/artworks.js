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
const proxyMetApi = require('../services/proxyMetApi.js');

routes.get('/', async (req, res) => {
  if (req.query.q == null)
    Promise.all(highlights.highlights.map(proxyMetApi.getArtwork))
    .then(resolved => res.send(resolved));

  else {

    let searchIds = await proxyMetApi.getSearch(req.query.q);

    if (searchIds) {
  
      Promise.all(searchIds.slice(0,100).map(proxyMetApi.getArtwork))
      .then(resolved => res.send(resolved));

    } else {
      console.log(`no result for search '${req.query.q}'`);
      res.send([]);
    }
  }
});

routes.get('/:id', async (req, res) => {
  const artwork = await proxyMetApi.getArtwork(parseInt(req.params.id));

  if (artwork) res.send(artwork);
  else res.sendStatus(404);
});

module.exports = routes;
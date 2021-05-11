/**
 * This module contains the routes under /artworks
 */

'use strict';

const express = require('express');
const routes = express.Router();
// const fs = require('fs');
// const path = require('path');

const highlights = require('../resources/highlights.json');
const proxyMetApi = require('../services/proxyMetApi.js');

routes.get('/', async (req, res) => {
  const idList = req.query.q ? await proxyMetApi.getSearch(req.query.q) : highlights.highlights;

  if (!idList) res.send([]);
  else Promise.all(idList.slice(0,100).map(proxyMetApi.getArtwork))
  .then(resolved => res.send(resolved));
});

routes.get('/:id', async (req, res) => {

  const artwork = await proxyMetApi.getArtwork(parseInt(req.params.id));
  
  if (artwork) res.send(artwork);
  else res.sendStatus(404);
});

module.exports = routes;
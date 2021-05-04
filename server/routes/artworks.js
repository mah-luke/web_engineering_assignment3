/**
 * This module contains the routes under /artworks
 */

'use strict';

import {Artwork} from '../models/artwork.js';

const express = require('express');
const routes = express.Router();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getArtwork(id) {
  const res = await fetch(MET_BASE_URL + '/objects/' + id);
  if (!res.ok) {
    return null;
  }
  const obj = await res.json();
  if (!obj || !obj.objectID) {
    return null;
  }

  // TODO: convert Met object - done?
  let artwork = new Artwork (
    obj.objectID,
    obj.title,
    obj.artistDisplayName,
    obj.objectDate,
    obj.primaryImageSmall
  )

  return artwork;
}

routes.get('/', async (req, res) => {
  if (req.query.q == null) {
    // TODO: return highlights
    res.send([]);
  } else {
    // TODO: search for artworks
    res.sendStatus(501);
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

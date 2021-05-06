const fetch = require('node-fetch');
const express = require('express');
const routes = express.Router();
const fs = require('fs');
const path = require('path');
const cache = require('node-cache');

const highlights = require('../resources/highlights.json');
const Artwork = require('../models/artwork.js');

const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getArtwork(id) {
    console.log(`call getArtwork(${id})`);
    // console.log(`fetching ${MET_BASE_URL + '/objects/' + id}`);

    const res = await fetch(MET_BASE_URL + '/objects/' + id);
    if (!res.ok) return null;

    const obj = await res.json();
    if (!obj || !obj.objectID) return null;
  
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
    // console.log(`fetch via ${MET_BASE_URL + '/search?q=' + searchParam}`);

    const res = await fetch(MET_BASE_URL + '/search?q=' + searchParam);
    if (!res.ok) return null;

    const obj = await res.json();
    if (!obj) return null;

    return obj.objectIDs;
}

exports.getArtwork = getArtwork;
exports.getSearch = getSearch;
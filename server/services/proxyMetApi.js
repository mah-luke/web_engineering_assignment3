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

exports.getArtwork = getArtwork;
exports.getSearch = getSearch;
const fetch = require('node-fetch');
const Cache = require('node-cache');

const Artwork = require('../models/artwork.js');
const artworkCache = new Cache();
const searchCache = new Cache();
const MET_BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getArtwork(id) {
    // console.log(`call getArtwork(${id})`);

    let artwork = artworkCache.get(id);

    if (!artwork) {
        console.log(`retrieving artwork (id: '${id}') via API-call`);

        const res = await fetch(MET_BASE_URL + '/objects/' + id);
        if (!res.ok) return null;
    
        const obj = await res.json();
        if (!obj || !obj.objectID) return null;
      
        artwork = new Artwork (
          obj.objectID,
          obj.title,
          obj.artistDisplayName,
          obj.objectDate,
          obj.primaryImageSmall
        );
        artworkCache.set(id, artwork);
    }

    return artwork;
}
  
async function getSearch(searchParam) {
    // console.log(`call getSearch(${searchParam})`);

    let search = searchCache.get(searchParam);

    if (!search) {
        console.log(`retrieving search (searchParam: ${searchParam}) via API-call`);

        const res = await fetch(MET_BASE_URL + '/search?q=' + searchParam + "&hasImages=true");
        if (!res.ok) return null;
    
        const obj = await res.json();
        if (!obj) return null;

        search = obj.objectIDs;
        searchCache.set(searchParam, search);
    }

    return search;
}

exports.getArtwork = getArtwork;
exports.getSearch = getSearch;
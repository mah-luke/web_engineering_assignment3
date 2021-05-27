const Cache = require('node-cache');
const idCache = new Cache();

function set(key, val){
    idCache.set(key, val);
}

function get(key){
    return idCache.get(key);
}

module.exports = {set, get}
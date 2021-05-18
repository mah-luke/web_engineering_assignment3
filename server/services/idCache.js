const Cache = require('node-cache');
const idCache = new Cache();

function set(key, val){
    idCache.set(key, val);
}

function get(key){
    idCache.get(key);
}

module.exports = { set, get}
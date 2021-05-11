const Cache = require('node-cache');
const cache = new Cache();

function getCart(sessionId, itemId) {
    return cache.get(sessionId)[itemId];
}

function setCart(sessionId, cartItem) {
    let carts = getCarts(sessionId);
    console.log(carts);

    if (!Array.isArray(carts)) carts = [];
    
    carts.append(cartItem);
    cache.set(sessionId, carts);
}

function getCarts(sessionId) {
    return cache.get(sessionId);
}

function setCarts(sessionId, cartItems) {
    cache.set(sessionId, cartItems);
}

exports.getCart = getCart;
exports.setCart = setCart;
exports.getCarts = getCarts;
exports.setCarts = setCarts;
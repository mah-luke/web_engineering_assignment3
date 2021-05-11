const Cache = require('node-cache');
const cache = new Cache();
const CartItem = require('../models/cartItem');

function getCart(sessionId, itemId) {
    return cache.get(sessionId)[itemId];
}

function setCart(sessionId, cartItem) {

    // TODO: write validation for CartItem
    let cartItemParsed = new CartItem(
        cartItem.cartItemId,
        cartItem.printSize,
        cartItem.artworkId,
        cartItem.frameStyle,
        cartItem.frameWidth,
        cartItem.matColor,
        cartItem.matWidth
    );
    console.log(cartItemParsed);

    let carts = getCarts(sessionId);
    console.log(carts);

    if (!Array.isArray(carts)) carts = [];
    
    carts.push(cartItemParsed);
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
const CartItem = require('../models/cartItem');

function test() {
    return 'test working';
}


function getCart(itemId) {
    return cache.get(sessionId)[itemId];
}

function setCart(cartItem) {
    let cartItemId = storage.length;

    console.log(cartItem);
    // TODO: write validation for CartItem
    let cartItemParsed = new CartItem(
        cartItemId,
        cartItem.printSize,
        cartItem.artworkId,
        cartItem.frameStyle,
        cartItem.frameWidth,
        cartItem.matColor,
        cartItem.matWidth
    );
    console.log(cartItemParsed);

    this.storage.push(cartItemParsed);
    return 0; // TODO: implement error codes
}

function getCarts() {
    return this.storage;
}

function setCarts(cartItems) {
    this.storage.push(cartItems);
}

exports.getCart = getCart;
exports.setCart = setCart;
exports.getCarts = getCarts;
exports.setCarts = setCarts;
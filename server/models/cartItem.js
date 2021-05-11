const priceCalc = require('../utils/price.js');

class CartItem {
    constructor(cartItemId, printSize, artworkId, frameStyle, frameWidth, matColor, matWidth) {
        this.cartItemId = cartItemId;
        this.artworkId = artworkId;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
        this.printSize = printSize;
        this.price = priceCalc.calculatePrice(this.printSize, frameStyle, frameWidth, matWidth);
    }
}

module.exports = CartItem;
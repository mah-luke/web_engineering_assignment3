class CartItem {
    constructor(cartItemId, price, artworkId, printSize, frameStyle, frameWidth, matColor, matWidth) {
        this.cartItemId = cartItemId;
        this.price = price;
        this.artworkId = artworkId;
        this.printSize = printSize;
        this.frameStyle = frameStyle;
        this.frameWidth = frameWidth;
        this.matColor = matColor;
        this.matWidth = matWidth;
    }
}

module.exports = CartItem;
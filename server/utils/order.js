const fs = require('fs');
const path = require('path');

/**
 * Write a new order with the given data into the /orders folder.
 */
function writeOrder(data) {
    const outputDir = path.join(__dirname, '../orders');
    const lastFile = fs.readdirSync(outputDir).sort().pop();
    const n = parseInt(lastFile.match(/order-([0-9]+).json/)[1]);
    const nextFilename = `order-${String(n+1).padStart(4,'0')}.json`;
    fs.writeFileSync(path.join(outputDir, nextFilename), JSON.stringify(data));
}

function mapOrder(bling, body, cart){
    return {
        order_date: body.created_at,
        email: bling.email,
        shipping_address: bling.shipping_address,
        card: body.payment_intent.card,
        amount: body.payment_intent.amount,
        currency: body.payment_intent.currency,
        cart: cart
    }
}

module.exports = { writeOrder, mapOrder}

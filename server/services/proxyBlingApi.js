const fetch = require('node-fetch');

const PaymentIntent = require('../models/PaymentIntent.js');
const BLING_BASE_URL = 'https://web-engineering.big.tuwien.ac.at/s21/bling';
const WEBHOOK = "https://localhost:3000/cart/checkout/payment-update";
const BLING_API_KEY = Buffer.from('ak_s21a3g085' + ':').toString('base64');

async function postPaymentIntent(price) {
    let data = JSON.stringify({
        amount: price,
        currency: "eur",
        webhook: WEBHOOK
    })

    const options = {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + BLING_API_KEY, 
            'Content-Type': 'application/json',
            'Content-Length': data.length
        },
        body: data
    } 
    console.log(options); 
    let res = await fetch(BLING_BASE_URL+ '/payment_intents', options);
    //let object = await res.json(); 
    console.log(res);
}

exports.postPaymentIntent = postPaymentIntent;
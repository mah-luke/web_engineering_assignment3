const fetch = require('node-fetch');

const PaymentIntent = require('../models/PaymentIntent.js');
const BLING_BASE_URL = 'https://web-engineering.big.tuwien.ac.at/s21/bling';
const authHeader = 'Basic ' + btoa(process.env.BLING_API_KEY + ':');


async function postPaymentIntent(price) {
    console.log(process.env.BLING_API_KEY);
    let data = JSON.stringify({
        amount: price,
        currency: "eur",
        webhook: process.env.WEBHOOK
    });

    const options = {
        method: 'POST',
        body: data,
        headers: {
            "Authorization": authHeader, 
            "Content-Type": 'application/json',
            "Content-Length": data.length
        }
    }; 
    console.log(options); 


    let res = await fetch(BLING_BASE_URL+ '/payment_intents', options);
    console.log(res);
    let bling_res = await res.json(); 
    console.log(bling_res);

    let answer = {
        payment_intent_id: bling_res.id,
        client_secret: bling_res.client_secret,
        amount: bling_res.amount,
        currency: bling_res.currency
    }

    console.log(answer);
    return answer;

}

exports.postPaymentIntent = postPaymentIntent;
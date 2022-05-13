class PaymentIntent {
    constructor(payment_id, created_at, amount, currency, client_secret, webhook, status){
        this.id = payment_id;
        this.created_at = created_at;
        this.amount = amount;
        this.currency = currency;
        this.client_secret = client_secret;
        this.webhook = webhook;
        this.status = status;
    }
}

module.exports = PaymentIntent;
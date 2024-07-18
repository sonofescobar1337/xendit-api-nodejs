const fetch = require('node-fetch');

async function craetepayment(apikey, rid, currency, amount, expires_at) {
    try {
        const url = await fetch('https://api.xendit.co/qr_codes', {
            method: 'POST',
            headers: {
                'api-version': '2022-07-31',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${apikey}:`).toString('base64')
            },
            body: JSON.stringify({
                'reference_id': `${rid}`,
                'type': 'DYNAMIC',
                'currency': `${currency}`,
                'amount': amount,
                'expires_at': expires_at.toISOString()
            })
        });

        const response = await url.json();
        return { response };
    } catch (error) {
        return { error };
    }
}

module.exports = {
    craetepayment
};

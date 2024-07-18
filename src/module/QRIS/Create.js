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

        let response;
        const contentType = url.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            response = await url.json();
        } else {
            response = await url.text();
            throw new Error(response);
        }

        if (!url.ok) {
            throw new Error(response.message || response);
        }

        return { response };
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    craetepayment
};

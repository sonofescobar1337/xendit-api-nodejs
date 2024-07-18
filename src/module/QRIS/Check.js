const fetch = require('node-fetch')


async function Check(qrid, apikey) {

    try {
        const url = await fetch(`https://api.xendit.co/qr_codes/${qrid}`, {
            method: 'GET',
            headers: {
              'api-version': '2022-07-31',
              'Content-Type': 'application/json',
              'Authorization': 'Basic ' + btoa(`${apikey}:`)
            }
          });

          const response = await url.json();

          return { response }
    } catch (error) {
        return { error }
    }
}


module.exports = {
    Check,
}
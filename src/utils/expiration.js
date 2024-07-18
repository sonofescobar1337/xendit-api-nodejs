require('dotenv').config();

function parseExpirationTime() {
    const expirationSetting = process.env.EXPIRATION_TIME;
    
    if (!expirationSetting) {
        throw new Error('EXPIRATION_TIME is not defined in the .env file');
    }

    const value = parseInt(expirationSetting.slice(0, -1));
    const unit = expirationSetting.slice(-1);

    if (isNaN(value)) {
        throw new Error('Invalid value for EXPIRATION_TIME in the .env file');
    }

    let duration;
    switch (unit) {
        case 'm':
            duration = value * 60 * 1000; // minutes
            break;
        case 'h':
            duration = value * 60 * 60 * 1000; // hours
            break;
        case 'd':
            duration = value * 24 * 60 * 60 * 1000; // days
            break;
        case 'o':
            duration = value * 30 * 24 * 60 * 60 * 1000; // months (approximated as 30 days)
            break;
        default:
            throw new Error('Invalid expiration time format in .env file');
    }

    return new Date(Date.now() + duration);
}

module.exports = parseExpirationTime;

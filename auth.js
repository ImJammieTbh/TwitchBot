const fetch = require('node-fetch');
const { CLIENT_ID, CLIENT_SECRET } = require('./const');

let appToken = null;
let tokenExpiry = 0;

async function getAppToken() {
    const now = Date.now();

    if (appToken && now < tokenExpiry) {
        return appToken;
    }

    const res = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials'
        })
    });

    const data = await res.json();

    appToken = data.access_token;
    tokenExpiry = now + (data.expires_in * 1000);

    return appToken;
}

module.exports = { getAppToken };
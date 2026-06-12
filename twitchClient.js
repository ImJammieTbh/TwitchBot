const tmi = require("tmi.js");
const {BOT_USERNAME, OAUTH_TOKEN, CHANNEL_NAMES} = require("./const");


const client = new tmi.Client({
    options: { debug: false },
    identity: {
        username: BOT_USERNAME,
        password: OAUTH_TOKEN,
    },
    channels: []
});

async function Initialise() {
    client.connect();
    console.log('[INIT]: Initializing...');
}

//send message on bot joins channel
client.on('join', (channel, userstate, self) => {
    if (!self) return;

    client.say(channel, 'is now connected!');
    console.log(`[JOIN]: Joined ${channel} and sent join message`);
});

module.exports = {
    client,
    Initialise,
}
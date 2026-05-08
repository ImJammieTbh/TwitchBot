const fetch = require('node-fetch');
const { client } = require('./twitchClient');
const { CHANNEL_NAMES, CLIENT_ID } = require('./const');
const { getAppToken } = require('./auth');
const { cleanChannelName } = require('./utils');
const { liveChannels, joinedChannels } = require('./state');

let intervalStarted = false;

async function startStreamWatcher() {
    console.log('[INIT]: Starting Module: StreamWatcher');

    if (!intervalStarted) {
        intervalStarted = true;

        await checkLiveStreams();
        setInterval(checkLiveStreams, 10 * 1000);
    }
}

async function checkLiveStreams() {
    try {
        console.log('[Streams]: Checking streams');

        const query = CHANNEL_NAMES
            .filter(c => c && c.trim() !== '')
            .map(c => `user_login=${cleanChannelName(c)}`)
            .join('&');

        const res = await fetch(`https://api.twitch.tv/helix/streams?${query}`, {
            headers: {
                'Client-ID': CLIENT_ID,
                'Authorization': `Bearer ${await getAppToken()}`
            }
        });

        const data = await res.json();

        const currentlyLive = new Set(
            (data.data ?? []).map(stream => stream.user_login)
        );

        // JOIN
        for (const channel of currentlyLive) {
            if (!liveChannels.has(channel) && !joinedChannels.has(channel)) {
                console.log(`[Streams]: ${channel} went live → joining`);
                await client.join(channel);
                joinedChannels.add(channel);
            }
        }

        // LEAVE
        for (const channel of liveChannels) {
            if (!currentlyLive.has(channel) && joinedChannels.has(channel)) {
                console.log(`[Streams]: ${channel} went offline → leaving`);
                await client.part(channel);
                joinedChannels.delete(channel);
            }
        }

        liveChannels.clear();
        for (const c of currentlyLive) liveChannels.add(c);

    } catch (err) {
        console.error('Error checking streams:', err);
    }
}

module.exports = { startStreamWatcher };
const { sendAction } = require('../modBridge');

function register(client) {
    client.on('cheer', (channel, userstate) => {
        console.log('[TWITCH - EVENTS] - user ' + userstate.username + ' cheered.');
        sendAction(channel, 'bossbar', {
            event: 'cheer',
            user: userstate['display-name'],
            amount: parseInt(userstate.bits, 10)
        }).catch(err => console.error('[MC MOD] bossbar cheer failed:', err.message));
    });

    client.on('subscription', (channel, username) => {
        sendAction(channel, 'bossbar', { event: 'sub', user: username })
            .catch(err => console.error('[MC MOD] bossbar sub failed:', err.message));
    });

    client.on('resub', (channel, username) => {
        sendAction(channel, 'bossbar', { event: 'sub', user: username })
            .catch(err => console.error('[MC MOD] bossbar resub failed:', err.message));
    });

    client.on('subgift', (channel, username, streakMonths, recipient) => {
        sendAction(channel, 'bossbar', { event: 'sub', user: recipient })
            .catch(err => console.error('[MC MOD] bossbar subgift failed:', err.message));
    });
}

module.exports = { register };
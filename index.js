console.log('Happy developing ✨');

const { Initialise } = require('./twitchClient');
require('./terminal');
const { client } = require('./twitchClient');
const { startStreamWatcher } = require('./streamWatcher');
const { startCommandListener } = require('./commandListener');
const { loadCommands } = require('./commandManager');

Initialise();

client.on('connected',() => {
    console.log('[INIT]: Bot connected to twitch');

    startCommandListener();
    startStreamWatcher();
    loadCommands();
})
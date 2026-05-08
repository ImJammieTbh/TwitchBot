const { client } = require('./twitchClient');
const { getCommands } = require('./commandManager');

function startCommandListener() {
    console.log('[INIT]: Starting Module: CommandListener');

    client.on('message', (channel, userstate, message, self) => {
        if (self) return;

        const cmd = message.toLowerCase();
        const commands = getCommands();

        if (commands[cmd]) {
            commands[cmd](client, channel, userstate);
        }
    });
}

module.exports = { startCommandListener };
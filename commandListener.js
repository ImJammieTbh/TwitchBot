const { client } = require('./twitchClient');
const { getCommands } = require('./commandManager');

function startCommandListener() {
    console.log('[INIT]: Starting Module: CommandListener');

    client.on('message', (channel, userstate, message, self) => {
        if (self) return;

        const commands = getCommands();

        if (!commands) return;

        const args = message.trim().split(' ');
        const cmdName = args[0].toLowerCase().replace('!', '');

        const command = commands.get(cmdName);

        if (!command) return;

        command.run(client, channel, userstate, args.slice(1));
    });
}

module.exports = { startCommandListener };
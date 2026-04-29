const { client } = require('./twitchClient');

function startChatCommands() {

    console.log('[INIT]: Starting Module: ChatCommands');

    client.on('message', (channel, userstate, message, self) => {
        if (self) return;

        // streamer-only command
        if (userstate.username === channel.substring(1)) {
            if (message.toLowerCase() === '!bottest') {
                client.say(channel, 'hi streamer');
            }
        }

        if (message.toLowerCase() === '!hello') {
            client.say(channel, `@${userstate.username}, heya!`);
        }

        if (message.toLowerCase() === '!peen') {
            client.say(channel, `@${userstate.username}, noice peen 8===================D`);
        }
    });

}

module.exports = { startChatCommands };
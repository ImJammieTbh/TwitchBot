module.exports = {
    '!hello': (client, channel, userstate) => {
        client.say(channel, `@${userstate.username}, heya!`);
    },

    '!peen': (client, channel, userstate) => {
        client.say(channel, `@${userstate.username}, noice peen 8===================D`);
    }
};
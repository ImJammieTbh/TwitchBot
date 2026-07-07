const { sendAction } = require('../modBridge');

module.exports = {
    name: "mc",
    aliases: [],
    channels: [],

    run: async (client, channel, userstate, args) => {
        try {
            const result = await sendAction(channel, "give", {
                player: userstate.username,
                item: `minecraft:${args[1] || 'diamond'}`,
                count: parseInt(args[2]) || 1
            });

            if (result.ok) {
                client.say(channel, `@${userstate.username} got it! ${result.ranCommand}`);
            } else {
                client.say(channel, `@${userstate.username}, that didn't work: ${result.error}`);
            }
        } catch (err) {
            console.error("[MC MOD]: error:", err.message);
            client.say(channel, `@${userstate.username}, couldn't reach the server`);
        }
    }
};
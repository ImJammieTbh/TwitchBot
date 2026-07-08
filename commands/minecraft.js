const { sendAction } = require('../modBridge');

module.exports = {
    name: "mc",
    aliases: [],
    channels: [],

    run: async (client, channel, userstate, args) => {
        if (!args[0]) {
            client.say("No command found. Please specify a command name");
        }
        switch (args[0]) {
            case "give":
                try {
                    const result = await sendAction(channel, "give", {
                        player: channel,
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
                break;

            case "randomTp":
                try {
                    const result = await sendAction(channel, "randomTeleport", {
                        player: channel,
                    });

                    if (result.ok) {
                        client.say(channel, `@${userstate.username} got it!`);
                    }
                    else {
                        client.say(channel, `@${userstate.username}, that didn't work: ${result.error}`);
                    }
                } catch (err) {
                    console.error("[MC MOD]: error:", err.message);
                    client.say(channel, `@${userstate.username}, couldn't reach the server`);
                }
                break;
        }
    }
};
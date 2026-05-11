module.exports = {
    name: "welcomeback",
    aliases: ["weba"],
    run: (client, channel, userstate) => {
        client.say(channel, `Welcome back to the Cult!!!`);
    }
};
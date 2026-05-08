module.exports = {
    name: "hello",
    aliases: ["hi"],
    run: (client, channel, userstate) => {
        client.say(channel, `@${userstate.username}, heya!!!`);
    }
};
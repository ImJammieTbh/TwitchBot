module.exports = {
    name: "peen",
    aliases: ["peenor"],
    channels: ["#lytzsifer"],

    run: (client, channel, userstate) => {
        client.say(channel, `@${userstate.username}, noice peen 8===============D`);
        console.log("[COMMAND]: commands response success")
    }
};
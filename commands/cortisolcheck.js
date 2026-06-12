module.exports = {
    name: "cortisolcheck",
    aliases: ["cortisol"], //must have a alies or remove this line
    channels: ["#romanrodribr"],

    run: (client, channel, userstate) => {
        const randomPercent = Math.floor(Math.random() * 101);
        let cortLevel;

        if (randomPercent <= 19) {
            cortLevel = "VERY LOW";
        } else if (randomPercent <= 39) {
            cortLevel = "LOW";
        } else if (randomPercent <= 59) {
            cortLevel = "MID";
        } else if (randomPercent <= 79) {
            cortLevel = "HIGH";
        } else {
            cortLevel = "FUCKING HIGH";
        }

        client.say(channel, `@${userstate.username} has a ${cortLevel} cortisol level!`);
        console.log("[COMMAND]: commands response success")
    }

};
module.exports = {
    name: "jcbday",
    aliases: ["bday", "birthday", "happybirthday", "hapbirth", "birth"],
    channels: ["#lytzsifer"],

    run: (client, channel, userstate) => {

        function birthday(month, day) {
            const today = new Date();

            const nlDate = new Date(
                today.toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })
            );

            today.setHours(0,0,0,0);

            const bday = new Date(today.getFullYear(), month - 1, day);

            if (bday < today) {
                bday.setFullYear(today.getFullYear() + 1);
            }

            const days = Math.floor((bday - today) / 86400000);

            return days;
        }

        const days = birthday(5, 9); // May 9th

        if (days === 0) {
            client.say(
                channel,
                `Wooooooooo, Happy Fucking Birthday JC from @${userstate.username}`
            );
            console.log("[COMMAND]: commands response success")
        } else {
            client.say(
                channel,
                `${days} days until JC's birthday`
            );
            console.log("[COMMAND]: commands response success")
        }
    }
};
const readline = require('readline');
const { client } = require('./twitchClient');
const { joinedChannels } = require('./state')

const { reloadCommands } = require('./commandManager')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`
Commands:
join <channel>
leave <channel>
leave all
list
status
reconnect
say <channel> <message>
reload commands
`);

rl.on('line', async (input) => {
    const [cmd, ...args] = input.trim().split(' ');
    const arg = args.join(' ');

    try {
        switch (cmd) {

            case 'join':
                if (!arg) return console.log('Usage: join <channel>');
                await client.join(arg);
                joinedChannels.add(arg);
                console.log(`Joined ${arg}`);
                break;

            case 'leave':
                if (!arg) return console.log('Usage: leave <channel>');
                await client.part(arg);
                joinedChannels.delete(arg);
                console.log(`Left ${arg}`);
                break;

            case 'leaveall':
            case 'leave-all':
            case 'leave all':
                for (const ch of [...joinedChannels]) {
                    await client.part(ch);
                    console.log(`Left ${ch}`);
                }
                joinedChannels.clear();
                break;

            case 'list':
                console.log([...joinedChannels].join(', ') || '(none)');
                break;

            case 'status':
                console.log('Channels:', [...joinedChannels]);
                break;

            case 'reconnect':
                console.log('Reconnecting...');
                await client.disconnect();
                await client.connect();
                console.log('Reconnected');
                break;

            case 'say': {
                const splitIndex = arg.indexOf(' ');

                if (splitIndex === -1) {
                    return console.log('Usage: say <channel> <message>');
                }

                const channel = arg.slice(0, splitIndex);
                const message = arg.slice(splitIndex + 1);

                if (!channel || !message) {
                    return console.log('Usage: say <channel> <message>');
                }

                await client.say(channel.startsWith('#') ? channel : `#${channel}`, message);
                console.log(`[SAY]: #${channel} -> ${message}`);
                break;
            }

            case 'reload-commands': {
                reloadCommands();
                break;
            }

            case 'shutdown':
            case 'stop':
            case 'exit':
                console.log('Shutting down bot...');

                for (const ch of [...joinedChannels]) {
                    try {
                        await client.part(ch);
                        console.log(`Left ${ch}`);
                    } catch (e) {
                        console.error(`Failed to leave ${ch}`, e);
                    }
                }

                joinedChannels.clear();

                try {
                    await client.disconnect();
                    console.log('Disconnected from Twitch');
                } catch (e) {
                    console.error('Disconnect error:', e);
                }

                rl.close();
                process.exit(0);
                break;

            default:
                console.log('Unknown command');
        }

    } catch (err) {
        console.error('Error:', err);
    }
});
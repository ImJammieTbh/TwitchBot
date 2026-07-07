const net = require('net');
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'mcServers.config.json');

function getServerForChannel(channel) {
    const servers = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const key = channel.startsWith('#') ? channel : `#${channel}`;
    const server = servers[key];

    if (!server) {
        throw new Error(`No Minecraft server configured for channel ${key}`);
    }

    return server;
}

function sendAction(channel, action, data = {}) {
    return new Promise((resolve, reject) => {
        const { host, port } = getServerForChannel(channel);
        const socket = net.createConnection({ host, port }, () => {
            const payload = JSON.stringify({ action, ...data });
            socket.write(payload + '\n');
        });

        let buffer = '';

        socket.on('data', (chunk) => {
            buffer += chunk.toString();
            if (buffer.includes('\n')) {
                socket.end();
                try {
                    resolve(JSON.parse(buffer.trim()));
                } catch (e) {
                    reject(e);
                }
            }
        });

        socket.on('error', reject);

        socket.setTimeout(5000, () => {
            socket.destroy();
            reject(new Error('mod connection timed out'));
        });
    });
}

module.exports = { sendAction };
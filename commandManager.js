const fs = require('fs');
const path = require('path');

const commandsPath = path.join(
    path.dirname(process.execPath),
    'commands'
);

let commands = new Map();

function loadCommands() {
    commands.clear();

    const files = fs.readdirSync(commandsPath);

    for (const file of files) {
        if (!file.endsWith('.js')) continue;

        const cmd = require(path.join(commandsPath, file));

        commands.set(cmd.name, cmd);

        // register aliases too
        if (cmd.aliases && cmd.aliases.length) {
            for (const alias of cmd.aliases) {
                commands.set(alias, cmd);
            }
        }
    }

    console.log('[INIT]: Commands loaded');
}

function reloadCommands() {
    const files = fs.readdirSync(commandsPath);

    for (const file of files) {
        if (!file.endsWith('.js')) continue;

        const fullPath = path.join(commandsPath, file);
        delete require.cache[require.resolve(fullPath)];
    }

    loadCommands();

    console.log('[RELOAD]: Commands reloaded');
}

function getCommands() {
    return commands;
}

module.exports = {
    loadCommands,
    reloadCommands,
    getCommands
};
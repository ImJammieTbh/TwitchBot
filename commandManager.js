const fs = require('fs');
const path = require('path');

const basePath = process.pkg
    ? path.dirname(process.execPath) // pkg executable folder
    : __dirname;                     // normal development

const commandsPath = path.join(basePath, 'commands');

let commands = new Map();

function loadCommands() {
    commands.clear();

    const files = fs.readdirSync(commandsPath);

    for (const file of files) {
        if (!file.endsWith('.js')) continue;

        const fullPath = path.join(commandsPath, file);

        delete require.cache[require.resolve(fullPath)];

        const cmd = require(fullPath);

        commands.set(cmd.name, cmd);

        // aliases
        if (cmd.aliases && cmd.aliases.length) {
            for (const alias of cmd.aliases) {
                commands.set(alias, cmd);
            }
        }
    }

    console.log('[INIT]: Commands loaded');
}

function reloadCommands() {
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
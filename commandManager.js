let commands = require('./commands');

function getCommands() {
    return commands;
}

function reloadCommands() {
    delete require.cache[require.resolve('./commands')];
    commands = require('./commands');
    console.log('[RELOAD]: commands.js reloaded');
}

module.exports = {
    getCommands,
    reloadCommands
};
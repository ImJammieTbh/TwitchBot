console.log('Happy developing ✨');

const { Initialise } = require('./twitchClient');
require('./terminal');
const { startStreamWatcher } = require('./streamWatcher');
const { startChatCommands } = require('./chatCommands');

Initialise();

startChatCommands();
startStreamWatcher();
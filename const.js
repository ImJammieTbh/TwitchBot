require('dotenv').config();

const CHANNEL_NAMES = process.env.CHANNEL_NAMES.split(',');
const OAUTH_TOKEN = process.env.OAUTH_TOKEN;
const BOT_USERNAME = process.env.BOT_USERNAME;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = {
    CHANNEL_NAMES,
    BOT_USERNAME,
    CLIENT_ID,
    CLIENT_SECRET,
    OAUTH_TOKEN };
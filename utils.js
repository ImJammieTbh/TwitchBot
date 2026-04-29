function cleanChannelName(name) {
    return name.replace(/^[@#]/, '').toLowerCase().trim();
}

module.exports = {
    cleanChannelName
};
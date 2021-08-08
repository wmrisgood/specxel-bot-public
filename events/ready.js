const client = require('../home.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setActivity('Specxel jerk off.', { type: 'WATCHING' });
        client.user.setStatus('dnd')
        console.log('ready')
    },
};
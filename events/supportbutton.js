const client = require('../home.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if(interaction.customId === 'support1'){
            interaction.reply({ content: "Lmao this button doesn't even work.", ephemeral: true })
        }
	},
};
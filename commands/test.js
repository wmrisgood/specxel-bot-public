const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: 'test',
    description: 'earhteq',
    async execute(interaction, client) {
      interaction.reply({content: 'hello', ephemeral: true })
    }
}

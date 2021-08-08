const { Client, Collection, Intents } = require('discord.js');
const Discord = require('discord.js')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
module.exports = client
const config = require('./config.json')
/*  slash commands   */
const data = [
	{
		name: 'test',
		description: 'Forgot what it does.',
	},
	{
		name: 'define',
		description: 'Gets a word from Merriam-Webster dictionary.',
		type: 'STRING',
		options: [{
			name: 'word',
			type: 'STRING',
			description: 'The word you need to define.',
			required: true,
		},
		{
			name: 'number',
			type: 'INTEGER',
			description: 'The definition number. Will be set to 1 if not provided/invalid.',
		}],
	},
	{
		name: 'visualize',
		description: 'Visualizes a color from a hexademic value.',
		type: 'STRING',
		options: [{
			name: 'color',
			type: 'STRING',
			description: 'A hex color code (e.g. "#38b4cc", or "d5e8a7")',
			required: true
		}]
	}
];
module.exports = data;
/* ---- */
const fs = require('fs');
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (!client.commands.has(interaction.commandName)) return;

	try {
		await client.commands.get(interaction.commandName).execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
client.on('messageCreate', async message => {
	if (!client.application?.owner) await client.application?.fetch();

	if (message.content.toLowerCase() === '>deploy' && message.author.id === client.application?.owner.id) {
		message.channel.send('k')

		let steps = 0;
		while(steps < data.length) {
			const command = await client.guilds.cache.get(`${message.channel.guild.id}`)?.commands.create(data[steps]);
			steps++
		}
	}
});

client.login(config.token)

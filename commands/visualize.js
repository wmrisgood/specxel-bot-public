const { Client, Message, MessageEmbed, MessageActionRow, MessageButton, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const hexCheck = require('hex-check');
const Canvas = require('canvas');
var hexToRgb = require('hex-to-rgb');
module.exports = {
    name: 'visualize',
    description: 'Gets a color from hex value.',
    async execute(interaction, client) {
        let hex = interaction.options.getString('color');
        if(!hex.startsWith('#')){
            let arr = ['#', hex]
            hex = arr.join('')
        }
        let hexconf = hex.slice(1)[1]
        let conf = hexCheck(hexconf)
        console.log(hex)
        console.log(hexconf)
        if(conf != true){
            interaction.reply({ content: 'Invalid hex code.', ephemeral: true })
        }else if(conf == true){
            let rgb = hexToRgb(hex).join(', ')
            let canvas = Canvas.createCanvas(80, 80);
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = `${hex}`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var attachment = new MessageAttachment(canvas.toBuffer(), 'color.png');
            var embed = new MessageEmbed()
                .setColor(hex)
                .setThumbnail('attachment://color.png')
                .addFields(
                    { name: 'Hex', value: `${hex}`, inline: false },
                    { name: 'RGB', value: `${rgb}`, inline: false }
                )
            interaction.reply({ embeds: [embed], files: [attachment]})

        }
    }
}

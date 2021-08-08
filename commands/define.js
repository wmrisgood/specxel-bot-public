const { Client, Message, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'define',
    description: 'Gets a word from Merriam-Webster dictionary.',
    async execute(interaction, client) {
      try{
        let word = interaction.options.getString('word');
        let num = Math.abs(interaction.options.getInteger('number'));
        let number = num - 1
        let res = await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=02549e8e-0d2b-4af9-a975-f83e2eae75aa`)
        let data = await res.json()
        let length = data[0].shortdef.length
        if( number + 1 > length || number < 0 || !number){
          number = 0
        }
        let definition = data[0].shortdef[number]
        let subdirectory = word.slice(0)[0]
        if(word.startsWith('gg')){
          subdirectory = 'gg'
        }
        if(word.startsWith('bix')){
          subdirectory = 'bix'
        }
        let base = data[0].hwi.prs[0].sound.audio
        let file = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subdirectory}/${base}.mp3`
        let define = new MessageEmbed()
          .setColor('#38b4cc')
          .setTitle(`Definition of ${word}`)
          .setAuthor('Definitions from Merriam-Webster', 'https://merriam-webster.com/assets/mw/static/social-media-share/mw-logo-245x245@1x.png')
          .setDescription(`Definition ${number + 1}: ${definition}`)
          .setFooter(`Showing definition ${number + 1} of ${length}・/define [word] [number]`)
        interaction.reply({ embeds: [define] })
        interaction.channel.send({files: [file]})
      } catch (error) {
        interaction.reply({ content: `Either an error occurred or that isn't a word.`, ephemeral: true })
      }
    }
}

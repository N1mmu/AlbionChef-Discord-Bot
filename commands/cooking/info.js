const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const info = require('./info.json')
module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('get info about the command')
    .addStringOption(option => 
        option.setName('command')
        .setDescription('choose the command')
        .addChoices(
            {name:'cook', value:'0'},
            {name:'ingredient', value:'1'},
            {name:'usage', value:'2'},
            {name:'returnrate', value:'3'},
            {name:'food info',value:'4'}
        )
    ),
    async execute(interaction) {
        const option =  Number(interaction.options.getString('command'));
        const embed = new EmbedBuilder()
                    .setColor(0xccff00)
                    .setTitle(info[option].name)
                    .setDescription(info[option].description)
                    .setFields(
                        ...info[option].tips
                    )
        await interaction.reply({embeds: [embed]});
        }
}

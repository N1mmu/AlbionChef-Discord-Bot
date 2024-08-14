const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const path = require('path');
const factors = require('./factors.json');

module.exports = {
    data : new SlashCommandBuilder()
            .setName('returnrate')
            .setDescription('set default return rate')
            .addIntegerOption(option =>
                option.setName('returnrate')
                .setDescription('return rate per 100 nutrition')
            ),
    async execute(interaction){
        const filePath = path.join(__dirname, '/factors.json');
        const returnRate = interaction.options.getInteger('returnrate');
        const old = factors.return;
        factors.return=returnRate;
        const jsonData = JSON.stringify(factors);
        fs.writeFileSync(filePath, jsonData, 'utf8');
        const embed = new EmbedBuilder()
                        .setColor(0xf6dea5)
                        .setTitle('Default return rate')
                        .setDescription('has been set')
                        .addFields(
                            {
                                name:'Old',
                                value:`${old}`,
                                inline: true
                            },
                            {
                                name:'New',
                                value:`${returnRate}`,
                                inline: true
                            }
                        )
        await interaction.reply({embeds: [embed]});
    }
}
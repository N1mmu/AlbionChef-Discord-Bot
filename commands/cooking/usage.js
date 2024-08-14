const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const path = require('path');
const factors = require('./factors.json');

module.exports = {
    data : new SlashCommandBuilder()
            .setName('usage')
            .setDescription('set default usage fee')
            .addIntegerOption(option =>
                option.setName('fee')
                .setDescription('usage fee per 100 nutrition')
            ),
    async execute(interaction){
        const filePath = path.join(__dirname, '/factors.json');
        const fee = interaction.options.getInteger('fee');
        const old = factors.usage;
        factors.usage=fee;
        const jsonData = JSON.stringify(factors);
        fs.writeFileSync(filePath, jsonData, 'utf8');
        const embed = new EmbedBuilder()
                        .setColor(0xf6dea5)
                        .setTitle('Default Usage fee')
                        .setDescription('has been set')
                        .addFields(
                            {
                                name:'Old',
                                value:`${old}`,
                                inline: true
                            },
                            {
                                name:'New',
                                value:`${fee}`,
                                inline: true
                            }
                        )
        await interaction.reply({embeds: [embed]});
    }
}
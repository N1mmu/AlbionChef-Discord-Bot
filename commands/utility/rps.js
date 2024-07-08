const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Rock paper scissor game')
    .addStringOption(option => 
        option.setName('input')
        .setDescription('user choice')
        .addChoices(
            {name:'Rock', value:'Rock'},
            {name:'Paper', value:'Paper'},
            {name:'Scissor', value:'Scissor'},
        )
    ),
    async execute(interaction) {
        const options = ['Rock','Paper','Scissor'];
        const choice = options[Math.floor(Math.random() * 3)];
        const uchoice = interaction.options.getString('input');
        if (uchoice== choice) {
            await interaction.reply(`${choice}!! \nIt was a draw.`);
        } else {

            if((choice=='Rock' && uchoice=='Paper')||(choice=='Paper' && uchoice=='Scissor') || (choice=='Scissor' && uchoice=='Rock'))
            await interaction.reply(`${choice}!! \nYou won.`);
            else
            await interaction.reply(`${choice}!! \nI wonnnn!!!!`);
        }

    }
}
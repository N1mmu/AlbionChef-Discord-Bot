const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const foodObject = require('./food.json');
const Ingredient = require('./ingredients.json');
const exampleEmbed = new EmbedBuilder().setColor(0x2A4D69);

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cook')
    .setDescription('cook calculator')
    .addStringOption(option => 
        option.setName('food')
        .setDescription('set food')
        .addChoices(
            {name:'Cabbage Soup', value:'0'},
            {name:'Goose Pie', value:'1'},
            {name:'Goose Omelette', value:'2'},
        )
    
    )
    .addIntegerOption(option => 
        option.setName('usagefee')
        .setDescription("What's the Usage Fee")
    ),
    async execute(interaction){
        var totalCost=0;
        const foodId = Number(interaction.options.getString('food'));
        const taxFee = interaction.options.getInteger('usagefee');
        const foodobj=foodObject[foodId];
        foodobj.ingredients.forEach(ingredObj =>{
        totalCost+=Ingredient[ingredObj.id].price*ingredObj.count;
        })
        const fee = (((foodobj.itemValue * 0.1125) * taxFee)*0.01);
        totalCost += fee;
        await interaction.reply(`The Total Cost is ${totalCost/10}`);
    }
}
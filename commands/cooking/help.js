const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');

module.exports = {
    data : new SlashCommandBuilder()
        .setName('help')
        .setDescription('shows how to use the bot')
    ,
    async execute(interaction){
        const embed = new EmbedBuilder()
            .setColor(0x8A2BE2)
            .setTitle('Steps')
            .setDescription('Here is how you use the bot')
            .addFields(
                {
                    name:"1) Ingredient, Usage fee, Return rate",
                    value: "\nUse **/food info** to find out what ingredients are required for the food. It will additionally display the cost of the ingredients.\n\nTo change the cost of the ingredient use **/ingredient**. For example, if we set the Raw Pork price to 350, the ingredient price is now saved in the database as 350, and this price is utilized for preparing any recipes that require Raw Pork until the price is changed.\n\nYou can also provide the default return rate and usage fee using **/usage** and **/returnrate**, which will be entered automatically if you do not enter them when using the /cook command to compute profit/loss."
                },
                {
                    name:'\u200B',
                    value:'\u200B'
                },
                {
                    name:"2) Calculating the profit/loss",
                    value:"\nAfter adding/modifying the price of ingredients needed for the particular food, we calculate the profit/loss using **/cook**.\n\nInput the name of the dish, the setup fee (the tax you pay when selling anything in the market; 6.5 if you have premium, 10.5 if not), the price at which the dish will be sold, and, if you plan to prepare enchanted food, the level of enchantment."
                }
            )
            .setFooter({text:"you can see the info about each command using /info"})
            await interaction.reply({embeds: [embed]});
    }
}

const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const foodObject = require('./food.json');
const Ingredient = require('./ingredients.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('food')
    .setDescription('deal with food')
    .addSubcommand(subcommand => 
        subcommand
        .setName('info')
        .setDescription('show info about the food')
        .addStringOption( option =>
            option
            .setName('name')
            .setDescription('food name')
            .setAutocomplete(true)
        )
    ),
    async autocomplete(interaction){
        const focusedValue = interaction.options.getFocused();
		const choices = [{ name: 'Grilled Fish', value: '0' },
              { name: 'Seaweed Salad', value: '1' },
              { name: 'Carrot Soup', value: '2' },
              { name: 'Wheat Soup', value: '3' },
              { name: 'Cabbage Soup', value: '4' },
              { name: 'Greenmoor Clam Soup', value: '5' },
              { name: 'Murkwater Clam Soup', value: '6' },
              { name: 'Blackbog Clam Soup', value: '7' },
              { name: 'Bean Salad', value: '8' },
              { name: 'Turnip Salad', value: '9' },
              { name: 'Potato Salad', value: '10' },
              { name: 'Shallowshore Squid Salad', value: '11' },
              { name: 'Midwater Octopus Salad', value: '12' },
              { name: 'Deepwater Kraken Salad', value: '13' },
              { name: 'Chicken Pie', value: '14' },
              { name: 'Goose Pie', value: '15' },
              { name: 'Pork Pie', value: '16' },
              { name: 'Upland Coldeye Pie', value: '17' },
              { name: 'Mountain Blindeye Pie', value: '18' },
              { name: 'Frostpeak Deadeye Pie', value: '19' },
              { name: 'Chicken Omlette', value: '20' },
              { name: 'Goose Omlette', value: '21' },
              { name: 'Pork Omelette', value: '22' },
              { name: 'Lowriver Crab Omelette', value: '23' },
              { name: 'Drybrook Crab Omelette', value: '24' },
              { name: 'Dusthole Crab Omlette', value: '25' },
              { name: 'Avalonian Chicken Omelette', value: '26' },
              { name: 'Avalonian Goose Omelette', value: '27' },
              { name: 'Avalonian Pork Omlette', value: '28' },
              { name: 'Goat Stew', value: '29' },
              { name: 'Mutton Stew', value: '30' },
              { name: 'Beef Stew', value: '31' },
              { name: 'Avalonian Goat Stew', value: '32' },
              { name: 'Avalonian Mutton Stew', value: '33' },
              { name: 'Avalonoan Beef Stew', value: '34' },
              { name: 'Greenriver Eel Stew', value: '35' },
              { name: 'Redspring Eel Stew', value: '36' },
              { name: 'Deadwater Eel Stew', value: '37' },
              { name: 'Goat Sandwich', value: '38' },
              { name: 'Mutton Sandwich', value: '39' },
              { name: 'Beef Sandwich', value: '40' },
              { name: 'Avalonian Goat Sandwich', value: '41' },
              { name: 'Avalonian Mutton Sandwich', value: '42' },
              { name: 'Avalonian Beef Sandwich', value: '43' },
              { name: 'Stonestream Lurcher Sandwich', value: '44' },
              { name: 'Rushwater Lurcher Sandwich', value: '45' },
              { name: 'Thunderfall Lurcher Sandwich', value: '46' },
              { name: 'Roast Chicken', value: '47' },
              { name: 'Roast Goose', value: '48' },
              { name: 'Roast Pork', value: '49' },
              { name: 'Roasted Whitefog Snapper', value: '50' },
              { name: 'Roasted Clearhaze Snapper', value: '51' },
              { name: 'Roasted Puremist Snapper', value: '52' }];
              const filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedValue.toLowerCase()));
              await interaction.respond(
                  filtered
              );
    },
    async execute(interaction){
        if(interaction.options.getSubcommand()==='info'){
            const foodId =  Number(interaction.options.getString('name'));
            const food = foodObject[foodId];
            const ingredients = food.ingredients.map(ingredientObj =>({
                    name : Ingredient[ingredientObj.id].name,
                    value : `${(Ingredient[ingredientObj.id].price==-1)? 'Not Entered' : Ingredient[ingredientObj.id].price}`
            }));
            const embed = new EmbedBuilder()
                        .setColor(0x400040)
                        .setTitle(food.food)
                        .setDescription('needs these ingredients')
                        .addFields(...ingredients)
                        .setFooter({text:'Change price using /ingredients'});
            await interaction.reply({embeds: [embed]});
                };
    }
}
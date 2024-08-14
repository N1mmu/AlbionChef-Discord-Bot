// Works with ingredients.json file

const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const ingredientJson = require('./ingredients.json')
const fs = require('fs');
const path = require('path');


module.exports = {
    data : new SlashCommandBuilder()
    .setName('ingredient')
    .setDescription('Sets the price of ingredients')
    .addStringOption(option=>
        option.setName('name')
        .setDescription('ingredient name')
        .setAutocomplete(true)
    )
    .addIntegerOption(option =>
        option.setName('price')
        .setDescription('cost of 1 ingredient')
    ),
    async autocomplete(interaction) {
		const focusedValue = interaction.options.getFocused();
		const choices = [
            { name: 'Carrot', value: '0' },
            { name: 'Bean', value: '1' },
            { name: 'Sheaf of Wheat', value: '2' },
            { name: 'Turnip', value: '3' },
            { name: 'Cabbage', value: '4' },
            { name: 'Potato', value: '5' },
            { name: 'Bundle of Corn', value: '6' },
            { name: 'Pumpkin', value: '7' },
            { name: 'Hen Eggs', value: '8' },
            { name: "Goat's Milk", value: '9' },
            { name: 'Goose Eggs', value: '10' },
            { name: "Sheep's Milk", value: '11' },
            { name: "Cow's Milk", value: '12' },
            { name: 'Raw Chicken', value: '13' },
            { name: 'Raw Goat', value: '14' },
            { name: 'Raw Goose', value: '15' },
            { name: 'Raw Mutton', value: '16' },
            { name: 'Raw Pork', value: '17' },
            { name: 'Raw Beef', value: '18' },
            { name: 'Sea Weed', value: '19' },
            { name: 'Chopped Fish', value: '20' },
            { name: 'Basic Fish Sauce', value: '21' },
            { name: 'Fancy Fish Sauce', value: '22' },
            { name: 'Special Fish Sauce', value: '23' },
            { name: "Goat's Butter", value: '24' },
            { name: "Sheep's butter", value: '25' },
            { name: "Cow's Butter", value: '26' },
            { name: 'Potato Schnapps', value: '27' },
            { name: 'Corn Hooch', value: '28' },
            { name: 'Pumpkin Moonshine', value: '29' },
            { name: 'Bread', value: '30' },
            { name: 'Greenmoor Clam', value: '31' },
            { name: 'Murkwater Clam', value: '32' },
            { name: 'Blackbog Clam', value: '33' },
            { name: 'Greenriver Eel', value: '34' },
            { name: 'Redspring Eel', value: '35' },
            { name: 'Deadwater Eel', value: '36' },
            { name: 'Upland Coldeye', value: '37' },
            { name: 'Mountain Blindeye', value: '38' },
            { name: 'Frostpeak Deadeye', value: '39' },
            { name: 'Stonestream Lurcher', value: '40' },
            { name: 'Rushwater Lurcher', value: '41' },
            { name: 'Thunderfall Lurcher', value: '42' },
            { name: 'Lowriver Crab', value: '43' },
            { name: 'Drybrook Crab', value: '44' },
            { name: 'Dusthole Crab', value: '45' },
            { name: 'Shallowshore Squid', value: '46' },
            { name: 'Midwater Octopus', value: '47' },
            { name: 'Deepwater Kraken', value: '48' },
            { name: 'Whitefod Snapper', value: '49' },
            { name: 'Clearhaze Snapper', value: '50' },
            { name: 'Puremist Snapper', value: '51' },
            { name: 'Arcane Agaric', value: '52' },
            { name: 'Brightleaf Comfrey', value: '53' },
            { name: 'Crenellated Burdock', value: '54' },
            { name: 'Dragon teasel', value: '55' },
            { name: 'Elusive Foxglove', value: '56' },
            { name: 'Firetouch Mullen', value: '57' },
            { name: 'Ghoul Yarrow', value: '58' },
            { name: 'Flour', value: '59' },
            { name: 'Avalonian Energy', value: '60' }
        ];
		const filtered = choices.filter(choice => choice.name.toLowerCase().includes(focusedValue.toLowerCase()));
		await interaction.respond(
			filtered
		);
	},
    async execute(Interaction){
        const filePath = path.join(__dirname, '/ingredients.json');
        // var data = fs.readFileSync(filePath);
        // var ingredientJson = JSON.parse(data);
        const ingId = Number(Interaction.options.getString('name'));
        const price = Interaction.options.getInteger('price');
        const old = ingredientJson[ingId].price;
        ingredientJson[ingId].price=price;
        const jsonData = JSON.stringify(ingredientJson);
        fs.writeFileSync(filePath, jsonData, 'utf8');
        const embed = new EmbedBuilder()
                        .setColor(0xf6dea5)
                        .setTitle(ingredientJson[ingId].name)
                        .setDescription('price has been changed')
                        .addFields(
                            {
                                name:'Old',
                                value:`${old}`,
                                inline: true
                            },
                            {
                                name:'New',
                                value:`${price}`,
                                inline: true
                            }
                        )
        await Interaction.reply({embeds: [embed]});
    }
}

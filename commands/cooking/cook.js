const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const foodObject = require('./food.json');
const Ingredient = require('./ingredients.json');
const factors = require('./factors.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('cook')
    .setDescription('cook calculator')
    .addStringOption(option => 
        option.setName('food')
        .setDescription('set food')
        .setAutocomplete(true))
    .addIntegerOption(option => 
        option.setName('usagefee')
        .setDescription("What's the Usage Fee")
    ).addIntegerOption(option=>
        option.setName('price')
        .setDescription('selling price')
    ).addNumberOption(option=>
        option.setName('return_rate')
        .setDescription('resource return rate')
    ).addNumberOption(option=>
        option.setName('setup_tax')
        .setDescription('setup fee in market')
    ).addIntegerOption(option=>
        option.setName('enchantment_lvl')
        .setDescription('enchantment level (1,2,3)')
        .setMinValue(1)
        .setMaxValue(3)
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
              const filtered = choices.filter(choice => choice.name.toLowerCase().startsWith(focusedValue.toLowerCase()));
              await interaction.respond(
                  filtered
              );
    },
    async execute(interaction){
        var hasPrice = true;
        const errPrices=[];
        var totalCost=0;
        const foodId = Number(interaction.options.getString('food'));
        const usage = interaction.options.getInteger('usagefee') ?? factors.usage;
        const price = interaction.options.getInteger('price');
        const returnRate = interaction.options.getNumber('return_rate') ?? factors.return;
        const setupFee = interaction.options.getNumber('setup_fee');
        const enchantment = interaction.options.getInteger('enchantment_lvl');
        const priceList =[];
        const foodobj=foodObject[foodId];
        if (enchantment && Ingredient[enchantment+20].price==-1){
            errPrices.push(
                {
                    name:Ingredient[enchantment+20].name,
                    value:'Price Missing',
                    inline:true
                }
        )
        hasPrice=false;
    }
        else  {
            priceList.push(
                {
                    name:Ingredient[enchantment+20].name,
                    value:`${Ingredient[enchantment+20].price}`,
                    inline:true
                }
            )
    }
        foodobj.ingredients.forEach(ingredObj =>{
        if (Ingredient[ingredObj.id].price==-1 ) {
            hasPrice =false;
            errPrices.push({
                name:Ingredient[ingredObj.id].name,
                value:'Price Missing',
                inline:true
            });
        }
        if(hasPrice){
        totalCost+=Ingredient[ingredObj.id].price*ingredObj.count;
        priceList.push(
            {
                name:Ingredient[ingredObj.id].name,
                value:`${Ingredient[ingredObj.id].price}`,
                inline:true
            });
        }

        })
        if(hasPrice){
        const fee = (((foodobj.itemValue * 0.001125) * usage));
        totalCost+= (enchantment)? (foodobj.fishSauceNo * Ingredient[enchantment+20].price) : 0 ;
        totalCost = ((totalCost*(100-returnRate)/100)/foodobj.amountCrafted)+(price*setupFee/100)+fee;

        const profit = price-totalCost;
        const cookEmbed = new EmbedBuilder()
            .setColor(0xdec1ff)
            .setTitle(foodobj.food)
            .setDescription('Has been cooked')
            .addFields(
                {
                    name:'Cost',
                    value:`${Math.round(100*totalCost)/100}`,
                    inline:true
                },
                {
                    name:'Price',
                    value:`${price}`,
                    inline:true
                },
                {
                    name:'Fee',
                    value:`${Math.round(fee*100)/100}`,
                    inline:true
                }
            )
            .addFields(
                {
                    name:'\u200B',
                    value:'\u200B'
                }
            )
            .addFields(
                {
                    name:`${(profit<0)? 'Loss' : 'Profit'}`,
                    value:`${Math.round(profit*100)/100}`,
                    inline:true},
                {
                    name:`${(profit<0)? 'Loss' : 'Profit'} %`,
                    value:`${Math.round(profit*10000/totalCost)/100}`,
                    inline:true}
            )
            .addFields(
                {
                    name:'\u200B',
                    value:'\u200B'
                }
            )
            .addFields(...priceList)
            .addFields(
                {
                    name:'\u200B',
                    value:'\u200B'
                }
            )
            .addFields({
                name:'Usage Fee',
                value: `${usage}`,
                inline:true
            },
            {
                name:"Resource Return Rate",
                value:`${returnRate}`,
                inline:true
            }
        )
            .setFooter({text:'You can change the ingredient price using /ingredient'})

        // await interaction.reply(`The Total Cost is ${totalCost/foodobj.amountCrafted}`);
        await interaction.reply({embeds: [cookEmbed]});
    }else{
        const cookEmbed = new EmbedBuilder()
        .setColor(0x990000)
        .setTitle(foodobj.food)
        .setDescription("Couldn't be cooked, Add the ingredient price using /ingredient")
        .addFields(
            {
                name:'\u200B',
                value:'\u200B'
            }
        )
        .addFields(
            ...errPrices
        )
        .addFields(
            {
                name:'\u200B',
                value:'\u200B'
            }
        )
        .setFooter({text:'Dont worry, I can wait'})
        await interaction.reply({embeds: [cookEmbed]});
    }
}
}
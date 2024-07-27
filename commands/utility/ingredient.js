// Works with ingredients.json file

const {SlashCommandBuilder} = require('discord.js');
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
        .addChoices(
            {name:'Cabbage', value:'0'},
            {name:'Carrot',value:'1'}
        )
    )
    .addIntegerOption(option =>
        option.setName('price')
        .setDescription('cost of 1 ingredient')
    ),
    async execute(Interaction){
        const filePath = path.join(__dirname, '/ingredients.json');
        // var data = fs.readFileSync(filePath);
        // var ingredientJson = JSON.parse(data);
        const ingId = Number(Interaction.options.getString('name'));
        const price = Interaction.options.getInteger('price');
        ingredientJson[ingId].price=price;
        const jsonData = JSON.stringify(ingredientJson);
        fs.writeFileSync(filePath, jsonData, 'utf8');
    }
}

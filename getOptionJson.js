// used for getting the options object
const ingredient = require('./commands/utility/ingredients.json');
const food = require("./commands/utility/food.json");
console.log("hello");
var dataIngredients =[];
var dataFood=[];
ingredient.forEach(ingred=>{
    dataIngredients.push({"name":ingred.name,"value":ingred.id.toString()})
});

food.forEach(f => {
    dataFood.push({"name":f.food,"value":f.id.toString()});
})
console.log("Ingredients data");
console.log(dataIngredients);
console.log("Food data");
console.log(dataFood);
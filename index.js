const dotenv = require('dotenv');
const { Client, Events, GatewayIntentBits } = require('discord.js');


const client = new Client({ intents: [GatewayIntentBits.Guilds]});
dotenv.config();


client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! logged in as ${readyClient.user.tag}`);
});

console.log(process.env.DISCORD_TOKEN);
// client.login(process.env.DISCORD_TOKEN);
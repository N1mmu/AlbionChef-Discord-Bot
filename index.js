const {token} = require('./config.json')
const { Client, Events, GatewayIntentBits } = require('discord.js');


const client = new Client({ intents: [GatewayIntentBits.Guilds]});


client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! logged in as ${readyClient.user.tag}`);
});

client.login(token);
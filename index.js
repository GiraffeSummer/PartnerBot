require("dotenv").config();
const fs = require("fs");
const { Client, Intents, Collection } = require("discord.js");

const bot = new Client(/*{ ws: { intents: Discord.Intents.ALL } }*/
    {
        intents: [Intents.FLAGS.GUILDS],
      //  partials: ['CHANNEL', 'MESSAGE']
    }
);
bot.commands = new Collection();

//Added useful functions to bot
require("./libraries/functions")(bot);

//Loads each command in "commands" folder
bot.loadCommands();

console.log("Loading events...");
try {
    fs.readdirSync("./events/").forEach((file) => {
        const event = require(`./events/${file}`);
        const eventName = file.substr(0, file.indexOf("."));
        bot.on(eventName, event.bind(null, bot));
        console.log(`Loaded event ${eventName} (${file})`);
    });
} catch (err) {
    console.log(`Error while loading events. ${err}`);
    console.log(err.stack);
}

require("./libraries/website")(bot); //create website

bot.login(process.env.TOKEN);
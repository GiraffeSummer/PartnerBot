const fs = require("fs");

const BaseCommand = {
  name: "wip",
  description: "none",
  usage: "-",
  aliases: [],
  admin: false,
  enabled: true,
};

module.exports = (bot) => {
  /** Loads each command in "commands" folder */
  bot.loadCommands = () => {
    console.log("Loading commands...");
    try {
      fs.readdirSync("./commands/").forEach((file) => {
        //Only js code may be loaded
        if (!file.endsWith(".js")) return;

        const command = require(`../commands/${file}`);
        command.config = MakeValid(command.config, BaseCommand);
        const commandName = command.config.name;
        command.config.file = file;
        if (command.config.enabled) {
          bot.commands.set(commandName, command);
          console.log(`Loaded command ${commandName} (${file})`);
        }
      });
    } catch (err) {
      console.log(`Error while loading commands. ${err}`);
    }
  };

  bot.loadEvents = () => {
    
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
  }

  /** Unloads each command in "commands" folder */
  bot.unloadCommands = () => {
    console.log("Unloading commands...");
    try {
      fs.readdirSync("./commands/").forEach((file) => {
        //Only js code is loaded
        if (!file.endsWith(".js")) return;
        try {
          delete require.cache[require.resolve(`../commands/${file}`)];
        } catch { }
      });
      bot.commands.clear();
    } catch (err) {
      console.log(`Error while unloading commands. ${err}`);
    }
  };

  bot.getUserFromMention = (mention) => {
    if (!mention) return;

    if (mention.startsWith("<@") && mention.endsWith(">")) {
      mention = mention.slice(2, -1);
      if (mention.startsWith("!")) {
        mention = mention.slice(1);
      }

      return bot.users.cache.get(mention);
    }
  };
};

function MakeValid(ob, compare) {
  let newob = {};
  for (let prop in compare) newob[prop] = (!NullOrUndefined(ob[prop])) ? ob[prop] : compare[prop];
  return newob;
}
module.exports.MakeValid = MakeValid;
module.exports.baseCommand = BaseCommand;

//works weirdly, but returns message if cannot run, so check if undefined, if not send whatever it returns as message
function CanRunCommand(config, message) {
  return true;
}
module.exports.CanRunCommand = CanRunCommand;

function NullOrUndefined(o) {
  return (o == undefined || o == null);
}
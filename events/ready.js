const { Check } = require("../libraries/GuildList")

module.exports = async (bot) => {
    console.log(`Logged in as ${bot.user.tag}`);


    //Set bot activity
    //const statusManager = require("../triggers/statusManager")(bot);

    //statusManager.ChangeStatus();
    //setInterval(() => statusManager.ChangeStatus(), 0.5 * 60 * 60 * 1000);

    //check all guilds

    const Guilds = bot.guilds.cache.map(guild => guild.id);

    Guilds.forEach(async guildId => {
        const guild = await bot.guilds.fetch(guildId);
        console.log(guild.name)
        Check(guild, bot);
    });
};

const { Check } = require("../libraries/GuildList")

module.exports = async (bot, guild) => {
    Check(guild, bot);
}
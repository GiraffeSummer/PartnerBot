const { Join } = require("../libraries/GuildList")

module.exports = async (bot, guild) => {
    Join(guild, bot);
}
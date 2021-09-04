const { Delete } = require("../libraries/GuildList")

module.exports = async (bot, guild) => {
    Delete(guild, bot);
}
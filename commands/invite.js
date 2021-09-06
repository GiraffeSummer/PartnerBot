module.exports.config = {
    name: "invite",
    description: "Invite the bot to your server",
    usage: "invite",
};
const perms = '2684996689'
module.exports.run = async (bot, message, args) => {
    message.author.send(`https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=` + perms).then(() => {
        message.react('✉');
    })
};

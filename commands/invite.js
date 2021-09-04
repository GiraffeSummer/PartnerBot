module.exports.config = {
    name: "invite",
    description: "Invite the bot to your server",
    usage: "invite",
};

module.exports.run = async (bot, message, args) => {
    message.author.send(`https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8`).then(() => {
        message.react('✉');
    })
};

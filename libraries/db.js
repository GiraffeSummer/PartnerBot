
const db = require('monk')(process.env.DB);
const guilds = db.get('guilds');
guilds.createIndex('guildId');
module.exports = { db, guilds }

const template = {
    active: true,
    guildId: "",
    name: "",
    icon: "",
    invite: "",
    joins: 0
}
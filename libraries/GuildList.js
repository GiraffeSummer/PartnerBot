const GeneralNames = ['general', 'chat', 'welcome', 'new'];//common names for a general chat
const { guilds } = require('./db.js');
const Join = async (guild, bot) => {
    try { //Try make invite (fails if no permission)
        const AllChannels = await guild.channels.fetch();
        const channelIds = [...AllChannels.keys()];
        const channelObjects = [...AllChannels.values()];
        const TextChannels = channelObjects.map((c, i) => {
            return { ...c, channelId: channelIds[i] }
        }).filter(x => x.type === 'GUILD_TEXT');

        const general = TextChannels.find(x => GeneralNames.includes(x.name.toLowerCase()));
        const channelOb = (general != undefined) ? general : TextChannels[0];

        const channel = await guild.channels.fetch(channelOb.channelId);
        if (channel == undefined) { return console.log('no channel found') };

        const dbDoc = { guildId: guild.id, name: guild.name, invite: undefined, icon: guild.iconURL({ format: 'webp', dynamic: true, size: 1024 }) };

        channel.createInvite(
            { maxAge: 0, maxUses: 0 },
            `Created for partner in Hall of fame.`
        ).then((invite) => {
            dbDoc.invite = invite.url;
            console.log(dbDoc);
            guilds.insert(dbDoc);
        }).catch(err => {
            //Missing Permissions
            const noPermissions = err.code == 50013;
            if (noPermissions) {
                console.log("No permission");
                //contact the guild in some way to
                channel.send("I do not have the right permission to create invite, please give me permission and (for now) kick me and invite me back!")
            }
            //still insert document (when fixed)
            //guilds.insert(dbDoc);
        })
    }
    catch (err) { console.error(err); }//silence error
    finally {
        //const embed = { content: guild.id, embed: { title: guild.name, color: "#62d0f6", description: (invite) ? `[invite](${invite.url})` : undefined, thumbnail: { url: guild.iconURL({ format: 'webp', dynamic: true, size: 1024 }) }, } }
        console.log(`Created for guild [${guild.id}]: ${guild.name}`);
    }
}
const Check = async (guild, bot) => {
    const guildObject = await guilds.find({ guildId: guild.id });
    if (guildObject.length == 0) {
        Join(guild);
    }
}

const Delete = async (guild, bot) => {
    guilds.remove({ guildId: guild.id })
    /*const messages = await StaticObjects.Channels.HALLOFFAME.messages.fetch()
     const msg = messages.find(x => x.content == guild.id);
     if (msg) msg.delete(); //delete message if can find*/
}

module.exports = { Join, Delete, Check }
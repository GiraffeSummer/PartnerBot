const defaultModifier = (s) => { return s };

const mod = async (msg, text, modifier = defaultModifier) => {
    if (text.length < 1) return;
    msg.delete();
    const hook = await msg.channel.createWebhook(msg.member.displayName, { avatar: msg.author.displayAvatarURL({ dynamic: true }) })
    await hook.send(modifier(text));
    hook.delete();
}
module.exports = mod
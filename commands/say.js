const webhook = require('../libraries/webhookify');
module.exports.config = {
    name: "say",
    description: "repeat the message as webhook",
    usage: "say {message}",
};

module.exports.run = async (bot, msg, args) => {
    webhook(msg, args.join(' '));
};

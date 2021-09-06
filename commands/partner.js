const webhook = require('../libraries/webhookify');
module.exports.config = {
    name: "partner",
    description: "get the partner website",
    usage: "partner",
};

module.exports.run = async (bot, msg, args) => {
    webhook(msg, 'https://partnerbot.cripplerick.com');
};

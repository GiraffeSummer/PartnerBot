const types = Object.freeze({ playing: "PLAYING", listening: "LISTENING", watching: "WATCHING" });
class statusManager {
    constructor(_bot) {
        this.bot = _bot;
        this.status = 0;
        this.stats = [
            { text: `Work in Progress.`, type: { type: types.playing } },
            { text: `Add me to your server to partner!`, type: { type: types.listening } },
            { text: `Contact 'criPPLe RiCK#7355' for suggestions bugs or anything.`, type: { type: types.listening } },
        ];
    }
    ChangeStatus() {
        this.status = this.status < this.stats.length - 1 ? this.status + 1 : 0;
        let stat = this.stats[this.status];
        this.bot.user.setActivity(stat.text, stat.type);
    }
}
module.exports = (_bot) => {
    return new statusManager(_bot);
};

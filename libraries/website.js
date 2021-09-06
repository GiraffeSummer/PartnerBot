const express = require('express')
const cors = require('cors');
const { guilds } = require('./db.js');
const app = express()

const port = 4466

app.set('view engine', 'ejs');
app.set('trust proxy', 1)
app.use(cors());
app.use('/resources', express.static('static'));

module.exports = (bot) => {
    const commands = bot.commands.map(command => { if (command.config.enabled) return command.config; });
    app.get('/', async (req, res) => {
        const servers = await guilds.find({})
        res.render('guilds', {
            guilds: servers.filter(x => x.active).map(x => {
                x.link = "/guild/" + x.guildId;
                return x;
            })
        });
    })
    app.get('/commands', async (req, res) => {
        const admin = ('admin' in req.query) ? true : false;
        let cmds = commands.filter(command => !command.admin || admin);
        res.render('index', { commands: cmds, admin });
    })

    app.get('/guild/:guildId', async (req, res) => {
        const { guildId } = req.params;
        let guild = await guilds.findOne({ guildId })
        guilds.findOneAndUpdate({ guildId }, { $set: { joins: guild.joins + 1 } }).then((updatedDoc) => { console.log("updated joins") })
        res.redirect(guild.invite);
    })

    app.listen(port, () => {
        console.log(`website was loaded (http://localhost:${port})`)
    })
}
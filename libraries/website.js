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
        res.render('guilds', { guilds: servers });
    })
    app.get('/commands', async (req, res) => {
        const admin = ('admin' in req.query) ? true : false;
        let cmds = commands.filter(command => !command.admin || admin);
        res.render('index', { commands: cmds, admin });
    })

    app.listen(port, () => {
        console.log(`website was loaded (http://localhost:${port})`)
    })
}
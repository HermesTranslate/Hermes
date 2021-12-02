import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
dotenv.config();

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", () => {
  console.log("The bot is Ready!")

  const wok = new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    typeScript: true,
    mongoUri: 'mongodb://localhost:27017',
    testServers: ['897594588590645278', '873759652192600075'],
    botOwners: ['277068610692972544'],
    ignoreBots: true
  })
    .setDefaultPrefix('?')
})

client.login(process.env.TOKEN);
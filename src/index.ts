import Discord from 'discord.js'
import onMessage from './event/onMessage'
import config from './config'

const client = new Discord.Client()

client.login(config.token).then(() => console.log('Bot is ready!'))
client.on('message', (...args) => onMessage(client, ...args))

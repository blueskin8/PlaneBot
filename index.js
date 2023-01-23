const Discord = require('discord.js')
const config = require('./config.js')

const Client = new Discord.Client(
    {
        intents: ["GuildBans", "GuildEmojisAndStickers", "GuildIntegrations", "GuildInvites", "GuildMembers", "GuildMessageReactions", "GuildMessageTyping", "GuildMessages", "GuildPresences", "GuildScheduledEvents", "GuildVoiceStates", "GuildWebhooks", "Guilds", "MessageContent"]
    }
)

Client.on('messageCreate', message => {
    require('./src/handler/Events/messageCreate.js')(Client, message)
})
Client.on('interactionCreate', interaction => {
    require('./src/handler/Events/interactionCreate.js')(Client, interaction)
})
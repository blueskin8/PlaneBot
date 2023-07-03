const Discord = require('discord.js')
const config = require('./config.js')

const Client = new Discord.Client(
    {
        intents: ["GuildBans", "GuildEmojisAndStickers", "GuildIntegrations", "GuildInvites", "GuildMembers", "GuildMessageReactions", "GuildMessageTyping", "GuildMessages", "GuildPresences", "GuildScheduledEvents", "GuildVoiceStates", "GuildWebhooks", "Guilds", "MessageContent"],
        partials: [Discord.Partials.Reaction, Discord.Partials.Message, Discord.Partials.Channel]
    }
)

Client.on('ready', () => {
    require('./src/handler/Events/ready.js')(Client)
})
Client.on("voiceStateUpdate", (oldState, newState) => {
    require('./src/handler/Events/voiceStateUpdate.js')(Client, oldState, newState)
})
Client.on('messageCreate', message => {
    require('./src/handler/Events/messageCreate.js')(Client, message)
})
Client.on('messageDelete', message => {
    require('./src/handler/Events/messageDelete.js')(Client, message)
})
Client.on('interactionCreate', interaction => {
    require('./src/handler/Events/interactionCreate.js')(Client, interaction)
})
Client.on('guildBanAdd', member => {
    require('./src/handler/Events/guildMemberAdd.js')(Client, member)
})
Client.on("messageReactionAdd", (react, user) => {
    require('./src/handler/Events/messageReactionAdd')(Client, react, user)
})
Client.on("messageReactionRemove", (react, user) => {
    require('./src/handler/Events/messageReactionRemove')(Client, react, user)
})

Client.login(config.application.token)

module.exports.config = config
module.exports.Client = Client
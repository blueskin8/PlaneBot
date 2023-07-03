const Discord = require('discord.js')
const config = require('../../../config.js')
const LogLine = require('../../systems/logs/LogLine')

/**
 * Quand une interaction est crée
 * @param {Discord.Client} Client 
 * @param {Discord.Interaction} interaction 
 */
module.exports = (Client, interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName == "create-ticket-message") return require('../../systems/ticket/commands/create-ticket-message.js').execute(Client, interaction)
        if (interaction.commandName == "welcome-message") return require('../../systems/newMember/welcomeMessage.js').execute(Client, interaction)
        if (interaction.commandName == "giveaway-create") return require('../../systems/giveaway/commands/giveaway-create.js').execute(Client, interaction)
        if (interaction.commandName == "sondage") return require('../../systems/sondage/commands/sondage.js').execute(Client, interaction)
        if (interaction.commandName == "sondages-clear") return require('../../systems/suggestion/commands/suggestionClear.js').execute(Client, interaction)
    }
    if (interaction.isButton()) {
        if (interaction.customId == "create-ticket") return require('../../systems/ticket/auto/create-channel.js').execute(Client, interaction)
        if (interaction.customId == "close-ticket1") return require('../../systems/ticket/auto/close-ticket1').execute(Client, interaction)
        if (interaction.customId == "close-ticket2") { new LogLine("Ticket", "Un ticket à été fermé définitivement"); return interaction.channel.delete() }
    }
}
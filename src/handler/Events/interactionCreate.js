const Discord = require('discord.js')
const config = require('../../../config.js')

/**
 * Quand une interaction est crée
 * @param {Discord.Client} Client 
 * @param {Discord.Interaction} interaction 
 */
module.exports = (Client, interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName == "create-ticket-message") return require('../../systems/ticket/commands/create-ticket-message.js').execute(Client, interaction)
    }
    if (interaction.isButton()) {
        if (interaction.customId == "create-ticket") return require('../../systems/ticket/auto/create-channel.js').execute(Client, interaction)
        if (interaction.customId == "close-ticket1") return require('../../systems/ticket/auto/close-ticket1').execute(Client, interaction)
        if (interaction.customId == "close-ticket2") return interaction.channel.delete()
    }
}
const Discord = require('discord.js')
const config = require('../../../config.js')
const LogLine = require('../../systems/logs/LogLine')

/**
 * Quand une reaction est ajoutée
 * @param {Discord.Client} Client 
 * @param {Discord.Message} message
 */
module.exports = async (Client, react, user) => {
    if (react.message.channel.id === '1032258360332009512' && !user.bot) {
        require('../../systems/suggestion/suggestion').manageReactions(Client, react, user)
    }
    // if (user.bot) {
    //     require('../../systems/sondage/commands/sondage').manageReactions(Client, react, user)
    // }
}
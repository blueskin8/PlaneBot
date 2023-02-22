const Discord = require('discord.js')
const config = require('../../../config.js')

/**
 * Quand un nouveau membre rejoins le serveur
 * @param {Discord.Client} Client 
 * @param {Discord.GuildMember} member
 */
module.exports = (Client, member) => {
    require('../../systems/newMember/createMessage.js').generate(Client, member)
}
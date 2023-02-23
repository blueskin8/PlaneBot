const Discord = require('discord.js')
const config = require('../../../config.js')
const LogLine = require('../../systems/logs/LogLine')

/**
 * Quand le bot est lancé
 * @param {Discord.Client} Client 
 * @param {Discord.Message} message
 */
module.exports = async (Client, message) => {
    new LogLine("BotLog", `message supprimé : \n    Contenu : ${message.content.toString().split('\n').join('\n              ')}\n    Auteur : ${message.author.id} ; ${message.author.tag} ; MessageId: ${message.id}\n    MessageChannel : ${message.channel.name} ; ${message.channel.id}`)
}
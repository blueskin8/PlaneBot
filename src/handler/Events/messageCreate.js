const Discord = require('discord.js')
const config = require('../../../config.js')
const LogLine = require('../../systems/logs/LogLine.js')

/**
 * Quand un message est envoyé
 * @param {Discord.Client} Client 
 * @param {Discord.Message} message 
 */
module.exports = (Client, message) => {
    new LogLine('BotLog', `nouveau message : \n    Contenu : ${message.content.toString().split('\n').join('\n              ')}\n    Auteur : ${message.author.id} : ${message.author.tag}; MessageId: ${message.id}\n    MessageChannel : ${message.channel.name} ; ${message.channel.id}\nMessageURL : ${message.url}`)
}
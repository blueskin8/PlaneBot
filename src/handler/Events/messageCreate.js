const Discord = require('discord.js');
const config = require('../../../config.js');
const LogLine = require('../../systems/logs/LogLine.js');

/**
 * Quand un message est envoyé
 * @param {Discord.Client} Client 
 * @param {Discord.Message} message
 */
module.exports = async (Client, message) => {
    new LogLine('BotLog', `nouveau message : \n    Contenu : ${message.content.toString().split('\n').join('\n              ')}\n    Auteur : ${message.author.id} : ${message.author.username}; MessageId: ${message.id}\n    MessageChannel : ${message.channel.name} ; ${message.channel.id}\n    MessageURL : ${message.url}`);

    if (message.channel.id === config.configuration.suggestionChannel && !message.author.bot) {
        require('../../systems/suggestion/suggestion.js').execute(Client, message)
    }
}

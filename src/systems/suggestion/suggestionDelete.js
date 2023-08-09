const Discord = require('discord.js')
const config = require('../../../config')

module.exports = {
    /**
     * @param {Discord.Client} Client
     * @param {Discord.Message} message
     */
    execute: async (Client, message) => {
        const thread = message.thread;
        if (thread) thread.delete();
    }
}

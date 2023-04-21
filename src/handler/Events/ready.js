const Discord = require('discord.js')
const config = require('../../../config.js')
const statut = require('../../systems/pterodactyl/statut.js')
const LogLine = require('../../systems/logs/LogLine')

/**
 * Quand le bot est lancé
 * @param {Discord.Client} Client 
 */
module.exports = async (Client) => {
    Client.user.setPresence(config.application.presence)

    await Client.application.commands.create(require('../../systems/ticket/commands/create-ticket-message.js').data)
    await Client.application.commands.create(require('../../systems/newMember/welcomeMessage.js').data)

    console.log('  _____  _                  ____        _                   __           _   _                        _   _ ')
    console.log(' |  __ \\| |                |  _ \\      | |                 /_/          | | (_)                      | | | |')
    console.log(' | |__) | | __ _ _ __   ___| |_) | ___ | |_    ___  _ __   ___ _ __ __ _| |_ _  ___  _ __  _ __   ___| | | |')
    console.log(" |  ___/| |/ _` | '_ \\ / _ \\  _ < / _ \\| __|  / _ \\| '_ \\ / _ \\ '__/ _` | __| |/ _ \\| '_ \\| '_ \\ / _ \\ | | |")
    console.log(" | |    | | (_| | | | |  __/ |_) | (_) | |_  | (_) | |_) |  __/ | | (_| | |_| | (_) | | | | | | |  __/ | |_|")
    console.log(" |_|    |_|\\__,_|_| |_|\\___|____/ \\___/ \\__|  \\___/| .__/ \\___|_|  \\__,_|\\__|_|\\___/|_| |_|_| |_|\\___|_| (_)")
    console.log('                                                   | |                                                      ')
    console.log('                                                   |_|                                                      ')

    //statut.getStatus()    

    setTimeout(() => {
        require('../../systems/logs/init.js').initLogs(Client)
        new LogLine('Bot', config.application.name + ' opérationnel')
        require('../../panel/startPanel')
    }, 1000)
}
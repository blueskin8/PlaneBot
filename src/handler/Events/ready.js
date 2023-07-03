const Discord = require('discord.js')
const config = require('../../../config.js')
const fs = require('fs')
const statut = require('../../systems/pterodactyl/statut.js')
const LogLine = require('../../systems/logs/LogLine')
const Nodeactyl = require('nodeactyl');
const { dir } = require('console')
const giveaway = true

/**
 * Quand le bot est lancé
 * @param {Discord.Client} Client
 */
module.exports = async (Client) => {
    const ptero = new Nodeactyl.NodeactylClient(config.application.pterodactyl.link, config.application.pterodactyl.token);

    Client.user.setPresence(config.application.presence)

    const commandFile = fs.readdirSync('D:\\Application\\Github\\PlaneBot\\src\\systems')
    try {
        commandFile.forEach(async uwu => {
            fs.readdirSync("D:\\Application\\Github\\PlaneBot\\src\\systems\\" + uwu).filter(async commandFolder => {
                if (commandFolder.endsWith(".js")) {
                    if (require("../../systems/" + uwu + "/" + commandFolder).data) {
                        await Client.application.commands.create(require("../../systems/" + uwu + "/" + commandFolder).data)
                    }
                }
            })
        })
    } catch (err) {
        console.log(err)
    }


    // await Client.application.commands.create(require('../../systems/ticket/commands/create-ticket-message.js').data)
    // await Client.application.commands.create(require('../../systems/newMember/welcomeMessage.js').data)
    // await Client.application.commands.create(require('../../systems/giveaway/commands/giveaway-create.js').data)
    await Client.application.commands.create(require('../../systems/sondage/commands/sondage.js').data)
    await Client.application.commands.create(require('../../systems/suggestion/commands/suggestionClear.js').data)

    console.log('  _____  _                  ____        _                   __           _   _                        _   _ ')
    console.log(' |  __ \\| |                |  _ \\      | |                 /_/          | | (_)                      | | | |')
    console.log(' | |__) | | __ _ _ __   ___| |_) | ___ | |_    ___  _ __   ___ _ __ __ _| |_ _  ___  _ __  _ __   ___| | | |')
    console.log(" |  ___/| |/ _` | '_ \\ / _ \\  _ < / _ \\| __|  / _ \\| '_ \\ / _ \\ '__/ _` | __| |/ _ \\| '_ \\| '_ \\ / _ \\ | | |")
    console.log(" | |    | | (_| | | | |  __/ |_) | (_) | |_  | (_) | |_) |  __/ | | (_| | |_| | (_) | | | | | | |  __/ | |_|")
    console.log(" |_|    |_|\\__,_|_| |_|\\___|____/ \\___/ \\__|  \\___/| .__/ \\___|_|  \\__,_|\\__|_|\\___/|_| |_|_| |_|\\___|_| (_)")
    console.log('                                                   | |                                                      ')
    console.log('                                                   |_|                                                      ')

    let status;
    let info;

    await ptero.getServerStatus("7172342f-0162-46c0-a216-d0a317f66d06").then(value =>
        status = value).catch(err => {
            console.log("Pterodactyl error: " + err)
        })
    // await ptero.getAllServers().then(value =>
    //     info = value)
    // info.data.forEach(server =>
    //     console.log(server.attributes.name + " " + server.attributes.uuid + " " + server.attributes.relationships.allocations.data[0].attributes.ip + ":" + server.attributes.relationships.allocations.data[0].attributes.port))

    setTimeout(() => {
        require('../../systems/logs/init.js').initLogs(Client)
        new LogLine('Bot', config.application.name + ' opérationnel')
        require('../../panel/startPanel')
    }, 1000)

    setInterval(() => {
        require('../../systems/giveaway/auto/giveaway-timestamp.js').execute(Client)
    }, 1000)

    setInterval(() => {
        statut.getStatus(ptero, Client)
    }, 10000)
}
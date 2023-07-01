const config = require('../../../config');
const Nodeactyl = require('nodeactyl');
const Discord = require('discord.js')

/**
 * 
 * @param {Nodeactyl.NodeactylClient} ptero 
 * @param {Discord.Client} Client
 */
module.exports.getStatus = async (ptero, Client) => {
    let serverStatut, channelName;
    await ptero.getServerStatus("7172342f-0162-46c0-a216-d0a317f66d06").then(value => {
        serverStatut = value
    })

    if (serverStatut == 'running') {
        channelName = "En ligne <:enligne:872830925728251925>"
    } else if (serverStatut == 'starting') {
        channelName = "Démarrage <:maintenance:872830926076411924>"
    } else if (serverStatut == 'offline') {
        channelName = "Éteint <:erreur:872830925602435093>"
    } else if (serverStatut == 'stopping') {
        channelName = "Éteint <:erreur:872830925602435093>"
    } else {
        console.log("erreur statut")
    }
    Client.channels.cache.get("1099304494447218708").messages.fetch("1099312877581647962").then(msg => msg.edit({
        embeds: [{
            color: config.application.color,
            title: "📈 Statut de PlaneSky",
            fields:
                [{ name: "Serveur Minecraft: ", value: channelName, inline: true }, //ajouter les ms
                { name: "Site Internet: ", value: "En ligne <:enligne:872830925728251925>", inline: true }]
            ,
            footer: { text: "Par " + config.application.name, iconURL: config.application.icon }
        }]
    }))
}
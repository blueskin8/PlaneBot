const Discord = require('discord.js')
const LogLine = require('../../logs/LogLine')
const config = require('../../../../config')

module.exports = {
    /**
     * Quand le bouton pour creer un ticket est cliqué
     * @param {Discord.Client} Client
     * @param {Discord.ButtonInteraction} interaction 
     */
    execute: (Client, interaction) => {

        let chList = new Array();
        interaction.guild.channels.cache.get(config.configuration.categorieTicket).children.cache.forEach((ch) => {
            if(ch.name.includes(interaction.member.displayName)) {
                chList.push(ch)
            }
        })
        if(chList.length >= 3) return interaction.reply({ embeds: [
            new Discord.EmbedBuilder()
                .setTitle('Erreur')
                .setColor('Red')
                .setDescription('Vous avez deja atteint le maximum de tickets (3 tickets max) !')
        ], ephemeral: true })

        interaction.guild.channels.create({
            name: "✉️┃ticket-" + interaction.member.displayName,
            parent: config.configuration.categorieTicket,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'SendMessages']
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['ViewChannel']
                },
                {
                    id: config.configuration.staffRole,
                    allow: ['ViewChannel', 'SendMessages']
                }
            ]
        }).then(channel => {
            channel.send({ embeds: [
                new Discord.EmbedBuilder()
                    .setTitle('Voici votre ticket')
                    .setDescription('Decrivez votre problème/demande le temps qu\'un membre du staff vous prenne en charge.\nVotre id : ' + interaction.user.id)
                    .setColor(config.application.color)
            ], components: [
                new Discord.ActionRowBuilder().addComponents(
                    new Discord.ButtonBuilder()
                        .setLabel('Fermer le ticket')
                        .setCustomId('close-ticket1')
                        .setStyle(Discord.ButtonStyle.Danger)
                )
            ], content: "<@" + interaction.user.id + ">"
            })//.then(msg => msg.pin().then(() => msg.channel.bulkDelete(1)))
            .then(() => {
                interaction.reply({ embeds: [
                    new Discord.EmbedBuilder()
                        .setTitle('Voici votre ticket ' + interaction.member.displayName)
                        .setColor(config.application.color)
                        .setDescription('Votre ticket à bien été crée dans le channel <#' + channel.id + ">")
                ], ephemeral: true }).then(() => {
                    new LogLine('Ticket', "Un ticket à été crée : " + channel.url)
                })
            })
        })
    }
}
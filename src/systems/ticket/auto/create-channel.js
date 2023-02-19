const Discord = require('discord.js')
const config = require('../../../../config')

module.exports = {
    /**
     * Quand le bouton pour creer un ticket est cliqué
     * @param {Discord.Client} Client
     * @param {Discord.ButtonInteraction} interaction 
     */
    execute: (Client, interaction) => {
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
                ], ephemeral: true })
            })
        })
    }
}
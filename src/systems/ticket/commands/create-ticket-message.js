const Discord = require('discord.js')
const config = require('../../../../config')

module.exports = {
    data: new Discord.SlashCommandBuilder().setName('create-ticket-message').setDescription('envoyer le message de ticket dans le channel actuel'),
    /**
     * Quand la commande /create-ticket-message est executée
     * @param {Discord.Client} Client
     * @param {Discord.CommandInteraction} interaction 
     */
    execute: (Client, interaction) => {
        interaction.channel.send({
            embeds: [new Discord.EmbedBuilder()
                .setTitle('Creer un ticket')
                .setDescription('Pour ouvrir un ticket, cliquez sur le bouton ci-dessous')
                .setColor(config.application.color)
                .setFooter({ text: "Par " + config.application.name, iconURL: config.application.icon })
            ], components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('create-ticket')
                            .setEmoji('✉️')
                            .setLabel('Creer un ticket')
                            .setStyle(Discord.ButtonStyle.Primary)
                    )
            ]
        })
    }
}
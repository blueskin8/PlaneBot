const Discord = require('discord.js')
const config = require('../../../../config')

module.exports = {
    /**
     * Quand le bouton pour supprimer le ticket 1 est cliqué
     * @param {Discord.Client} Client
     * @param {Discord.ButtonInteraction} interaction 
     */
    execute: (Client, interaction) => {
        let idUser;
        interaction.channel.messages.fetch().then(msgs => {
            idUser = msgs.last().embeds[0].description.split(':')[1].replaceAll(' ', '')
            interaction.channel.permissionOverwrites.delete(Client.users.cache.get(idUser)).then(() => {
                interaction.reply(`Permissions de ${Client.users.cache.get(idUser).tag} retirées`)
                interaction.message.edit({
                    components: [
                        new Discord.ActionRowBuilder()
                            .setComponents(
                                new Discord.ButtonBuilder()
                                    .setLabel('Supprimer le channel')
                                    .setCustomId('close-ticket2')
                                    .setStyle(Discord.ButtonStyle.Danger)
                            )
                    ]
                })
            })
        })
    }
}
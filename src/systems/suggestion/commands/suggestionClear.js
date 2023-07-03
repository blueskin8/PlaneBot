const Discord = require('discord.js')
const config = require('../../../../config')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('sondages-clear')
        .setDescription('supprimer tous les sondages'),
    /**
     * @param {Discord.Client} Client
     * @param {Discord.CommandInteraction} interaction
     */
    execute: async (Client, interaction) => {
        console.log(interaction.guild.channels.cache.get("1032258360332009512"))
        const messages = interaction.guild.channels.cache.get("1032258360332009512").messages.fetch({ limit: 100 })
        // messages.forEach(async (msg) => {
        //     if (msg.embeds.fields[0].name == "Suggestion") {
        //         console.log("Ca marche")
        //     }
        // })
    }
}
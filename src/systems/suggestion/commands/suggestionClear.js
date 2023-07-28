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
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            return interaction.reply({ content: 'Vous devez être administrateur pour utiliser cette commande.', ephemeral: true })
        }

        const channel = interaction.channel;
        console.log(channel.messages.cache)
        try {
            const messages = await channel.messages.channel.id('1032258360332009512').messages.fetch({ limit: 100 }); // Récupérer les 100 derniers messages du channel

            messages.forEach(async (msg) => {
                if (msg.embeds.length > 0) {
                    await msg.delete(); // Supprimer le message s'il contient un embed
                }
            });

            interaction.reply('Tous les messages embed ont été supprimés du channel.');
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
            interaction.reply('Une erreur s\'est produite lors de la suppression des messages embed.');
        }

        // console.log(interaction.guild.channels.cache.get("1032258360332009512"))
        // const messages = interaction.guild.channels.cache.get("1032258360332009512").messages.fetch({ limit: 100 })
        // messages.forEach(async (msg) => {
        //     if (msg.embeds.fields[0].name == "Suggestion") {
        //         console.log("Ca marche")
        //     }
        // })
    }
}
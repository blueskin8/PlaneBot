const Discord = require('discord.js')
const config = require('../../../../config')
const minecraftServerURL = 'http://node2.by-h.fr:25972/stats'; 

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('stats')
        .setDescription('Voir les statistiques d\'un joueur en jeu')
        .addStringOption(joueur => joueur.setName("joueur").setDescription("Username Minecraft In-Game du joueur").setRequired()),
    /**
     * @param {Discord.Client} Client
     * @param {Discord.CommandInteraction} interaction
     */
    execute: async (Client, interaction) => {
        try {
            let username = interaction.options.getString("joueur")
            const response = await fetch(`${minecraftServerURL}?username=${encodeURIComponent(username)}`);
            const data = await response.json();

            if (data.exists) {
                interaction.reply({ content: `Statistiques de ${data.username} : ${JSON.stringify(data.stats)}`, ephemeral: true });
            } else {
                interaction.reply({ content: "Le joueur n'existe pas ou ne s'est pas connecté.", ephemeral: true });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des statistiques du joueur :', error);
            interaction.reply({ content: 'Une erreur s\'est produite lors de la récupération des statistiques du joueur.', ephemeral: true });
        }
    }
}
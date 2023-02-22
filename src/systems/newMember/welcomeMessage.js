const Discord = require('discord.js')
const config = require('../../../config')

module.exports = {
    data: new Discord.SlashCommandBuilder().setName('welcome-messgae').setDescription('tester le message de bienvenue dans le channel actuel').addUserOption(user => user.setName("utilisateur").setDescription('L\'utilisateur avec lequel tester').setRequired(true)).addBooleanOption(input => input.setName("dans_ce_channel").setDescription('Envoyer le message de bienvenue dans ce channel')),
    /**
     * Quand la commande /welcome-message est executée
     * @param {Discord.Client} Client
     * @param {Discord.CommandInteraction} interaction 
     */
    execute: (Client, interaction) => {
        let thisChannel = interaction.options.getBoolean("dans_ce_channel")
        let member = interaction.options.getMember("utilisateur")
        if (thisChannel == true) return require('./createMessage.js').generate(Client, member, true, interaction.channel)
        require('./createMessage.js').generate(Client, member)
    }
}
const Discord = require('discord.js');
const config = require('../../../../config');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('staff')
        .setDescription('Voir les membres du staff en ligne')
    // .addStringOption((option) =>
    //     option
    //         .setName(''))
    ,

    /**
     * @param {Discord.Client} client
     * @param {Discord.CommandInteraction} interaction
     */
    execute: async (client, interaction) => {
        let staffOnline = new Set();
        function verifOnline(id) {
            let role = interaction.guild.roles.cache.find((role) => role.id == id);
            if (role) {
                role.members.forEach((member) => {
                    if (member.presence && member.presence.status !== 'offline') {
                        staffOnline.add(member.user);
                    }
                });
            }
        }

        verifOnline('872174143922114570'); // fondateur
        verifOnline('872174144391872533'); // administrateur
        verifOnline('872174145381756998'); // développeur
        verifOnline('872174146304503828'); // modérateur

        staffOnline = Array.from(staffOnline).join(', ')

        interaction.reply({
            embeds: [{
                title: 'Staff connecté(s)',
                color: config.application.color,
                description: staffOnline ? staffOnline : "Aucun staff connecté sur le discord !",
                thumbnail: { url: config.application.icon },
                timestamp: new Date().toISOString(),
            }]
        })
    }
};

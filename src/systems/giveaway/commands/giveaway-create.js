const Discord = require('discord.js')
const JsonEditor = require('./../../../utils/JsonEditor.js')

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('giveaway-create')
        .setDescription('lancer un giveaway')
        .addNumberOption(winner => winner.setName("gagnants").setDescription('Le nombre de gagnant à ce giveaway').setRequired(true))
        .addStringOption(prize => prize.setName("récompense").setDescription('Le/Les récompense(s) de ce giveaway').setRequired(true))
        .addNumberOption(jour => jour.setName("jour").setDescription('La durée du giveaway (en jour)'))
        .addNumberOption(heure => heure.setName("heure").setDescription('La durée du giveaway (en heure)'))
        .addNumberOption(minute => minute.setName("minute").setDescription('La durée du giveaway (en minute)'))
        .addNumberOption(seconde => seconde.setName("seconde").setDescription('La durée du giveaway (en seconde)')),
    /**
     * Quand la commande /giveaway-create est executée
     * @param {Discord.Client} Client
     * @param {Discord.CommandInteraction} interaction 
     */
    execute: async (Client, interaction) => {
        let jour = interaction.options.getNumber("jour");
        let jourSeconde = jour * 86400
        let heure = interaction.options.getNumber("heure");
        let heureSeconde = heure * 3600
        let minute = interaction.options.getNumber("minute");
        let minuteSeconde = minute * 60
        let seconde = interaction.options.getNumber("seconde");

        if (!jour && !heure && !minute && !seconde) {
            interaction.reply({ content: "Vous devez indiquer au minimum une durée (en jour et/ou heure et/ou minute et/ou seconde) !", ephemeral: true });

        } else if (heure > 23 || minute > 59 || seconde > 59) {
            interaction.reply({ content: "Vous avez indiqué une durée supérieur à celle maximale (Max: jour:aucune, heure:23, minute:59, seconde:59) !", ephemeral: true })
        } else {
            const endTimestamp = jourSeconde + heureSeconde + minuteSeconde + seconde + (Math.floor(Date.now() / 1000))
            const giveawayTime = (jourSeconde + heureSeconde + minuteSeconde + seconde) * 1000

            const winner = interaction.options.getNumber("gagnants");
            const prize = interaction.options.getString("récompense");

            let embedGiveaway = await interaction.reply({
                embeds: [{
                    color: 0x09db00,
                    title: `🎉  Giveaway - ${prize}`,
                    thumbnail: { url: "https://planesky.fr/storage/img/logo.png" },
                    description: `<:dot:1101630772609286194> ${winner > 1 ? `**${winner}** gagnants` : `**1** gagnant`}\n<:green_dot:1101630772609286194> Crée par **${interaction.user.username}**\n<:green_dot:1101630772609286194> Fini le: **<t:${endTimestamp}:f> (<t:${endTimestamp}:R>)**\n\nRéagissez avec 🎉 pour rejoindre le giveaway`
                }],
                fetchReply: true
            });
            let reactSelect = await embedGiveaway.react("🎉")
            JsonEditor.set(`${embedGiveaway.id}`, `${endTimestamp * 1000}`)

            setTimeout(async () => {
                let winnerReact = []
                let reactHumans = reactSelect.users.cache.filter(noBot => !noBot.bot).random(winner);
                winnerReact.push(reactHumans)
                let GiveawayWinners = winnerReact.map(winners => winners).join(", ");
                if (reactHumans.length < 1) {
                    //console.log(await Client.channels.cache.get("872174178462224384").messages.fetch("1104354398131462174"))
                    embedGiveaway.edit({
                        embeds: [{
                            color: 0xff0000,
                            title: `❌  Giveaway - ${prize}`,
                            thumbnail: { url: "https://planesky.fr/storage/img/logo.png" },
                            description: `Personne n'a participé à ce giveaway, dommage !`
                        }]
                    })
                    reactSelect.remove()
                } else {
                    embedGiveaway.edit({
                        embeds: [{
                            color: 0xff0000,
                            title: `🎁  Giveaway - ${prize}`,
                            thumbnail: { url: "https://planesky.fr/storage/img/logo.png" },
                            description: `${winner > 1 ? `Les gagnants sont ${GiveawayWinners}` : `Le gagnant est ${winnerReact}`}`
                        }]
                    })
                }
            }, giveawayTime)
        }
    }
}
const Discord = require('discord.js')
const config = require('../../../../config')
function chiffreEnLettre(chiffre) {
    var chiffresEnLettres = ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
    if (chiffre >= 0 && chiffre <= 10) {
        return chiffresEnLettres[chiffre];
    } else {
        return "";
    }
}

function separerMotsPhrases(chaine) {
    let motsPhrases = [];
    let motActuel = "";
    let phraseActuelle = "";
    let estDansPhrase = false;

    for (let i = 0; i < chaine.length; i++) {
        let caractere = chaine.charAt(i);
        if (caractere === " ") {
            if (!estDansPhrase) {
                if (motActuel) {
                    motsPhrases.push(motActuel);
                    motActuel = "";
                }
            } else {
                phraseActuelle += caractere;
            }
        } else if (caractere === '"') {
            if (estDansPhrase) {
                if (phraseActuelle) {
                    motsPhrases.push(phraseActuelle.trim());
                }
                phraseActuelle = "";
            }
            estDansPhrase = !estDansPhrase;
        } else {
            if (!estDansPhrase) {
                motActuel += caractere;
            } else {
                phraseActuelle += caractere;
            }
        }
    }

    if (!estDansPhrase) {
        if (motActuel) {
            motsPhrases.push(motActuel);
        }
    } else {
        if (phraseActuelle) {
            motsPhrases.push(phraseActuelle.trim());
        }
    }

    return motsPhrases;
}

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('sondage')
        .setDescription('lancer un sondage/terminé un sondage en entrant un id de message')
        .addStringOption(question => question.setName("question").setDescription('Question du sondage').setRequired(true))
        .addStringOption(question => question.setName("réponses").setDescription('Réponses du sondage | sauter un espace = nouvelle réponse, entre guillemets = longue réponse').setRequired(true))
        .addStringOption(id => id.setName("id").setDescription('ID du sondage à terminer')),
    /**
     * @param {Discord.Client} Client
     * @param {Discord.CommandInteraction} interaction
     */
    execute: async (Client, interaction) => {
        let questionEmbed = interaction.options.getString("question")
        let reponsesEmbed = interaction.options.getString("réponses")
        let resultats = separerMotsPhrases(reponsesEmbed);
        if (resultats.length > 11) {
            interaction.reply({ content: "Le maximum de réponses est 11 !", ephemeral: true })
        } else {
            let textEmbed = []
            for (let i = 0; i < resultats.length; i++) {
                textEmbed.push(`${chiffreEnLettre(i)} ` + resultats[i])
            }
            let sondage = await interaction.reply({
                embeds: [{
                    title: questionEmbed,
                    color: config.application.color,
                    description: textEmbed.join('\n'),
                    footer: { text: `Par ${interaction.user.username}`, icon_url: interaction.user.avatarURL() },
                    timestamp: new Date().toISOString(),
                }], fetchReply: true
            })
            for (let i = 0; i < resultats.length; i++) {
                sondage.react(chiffreEnLettre(i))
            }
        }
    }
}

const Discord = require('discord.js')
const config = require('../../../config')

const jaime = "<:jaime:872830926072213554>",
    jaimePas = "<:jenaimepas:872830925984137296>"

// module.exports = {
//     /**
//      * @param {Discord.Client} Client
//      * @param {Discord.Message} message
//      */
//     execute: async (Client, message) => {
//         let suggestionEmbed = await message.channel.send({
//             embeds: [{
//                 author: { name: message.member.displayName, icon_url: message.author.avatarURL() },
//                 fields: [
//                     { name: "Suggestion", value: message.content },
//                     { name: "<:jaime:872830926072213554>", value: "**0.00%**", inline: true },
//                     { name: "<:jenaimepas:872830925984137296>", value: "**0.00%**", inline: true },

//                 ],
//                 footer: { text: "PlaneSky", icon_url: config.application.icon },
//                 color: config.application.color,
//                 timestamp: new Date().toISOString()
//             }],
//             fetchReply: true
//         })
//         message.delete()
//         await suggestionEmbed.react('<:jaime:872830926072213554>');
//         await suggestionEmbed.react('<:jenaimepas:872830925984137296>');
//         await suggestionEmbed.startThread({
//             name: `Suggestion de ${message.author.username}`,
//             type: 'GUILD_PUBLIC_THREAD'
//         })
//     },
//     /**
//      * @param {Discord.Client} Client
//      * @param {Discord.MessageReaction} react
//      * @param {Discord.User} ruser
//      */
//     manageReactions: async (Client, react, ruser) => {
//         if (react.partial) {
//             try {
//                 await react.fetch();
//             } catch (error) {
//                 console.error(error);
//                 return;
//             }
//         }

//         let reactions = react.message.reactions.cache.map(r => { return r }).filter(r => r.emoji.name == 'jenaimepas' || r.emoji.name == 'jaime')
//         // console.log(reactions)
//         let [react1, react2] = reactions
//         let reactAllCount = (react1.count - 1 + react2.count - 1)
//         let react1Count = Number((react1.count - 1) / reactAllCount * 100).toFixed(2)
//         let react2Count = Number((react2.count - 1) / reactAllCount * 100).toFixed(2)
//         // console.log("1: " + react1Count)
//         // console.log("2: " + react2Count)
//         // console.log("All: " + reactAllCount)
//         // console.log(react.message.content)

//         // console.log(react.message.embeds[0])
//         let oldEmbed = react.message.embeds[0]
//         // console.log(oldEmbed)

//         await react.message.edit({
//             embeds: [{
//                 author: oldEmbed.author,
//                 fields: [
//                     oldEmbed.fields[0],
//                     { name: "<:jaime:872830926072213554>", value: `**${isNaN(react1Count) ? "0.00" : react1Count}%**`, inline: true },
//                     { name: "<:jenaimepas:872830925984137296>", value: `**${isNaN(react2Count) ? "0.00" : react2Count}%**`, inline: true },

//                 ],
//                 footer: oldEmbed.footer,
//                 color: oldEmbed.color,
//                 timestamp: oldEmbed.timestamp,
//             }]
//         })



//         if ((await react1.users.fetch()).has(ruser.id) && (await react2.users.fetch()).has(ruser.id)) {
//             react.users.remove(ruser)
//         }
//     }
// }

let reactJaimeUsers = [], reactJaimepasUsers = []

module.exports = {
    /**
     * @param {Discord.Client} Client
     * @param {Discord.Message} message
     */
    execute: async (Client, message) => {
        let suggestionEmbed = await message.channel.send({
            embeds: [{
                author: { name: message.member.displayName, icon_url: message.author.avatarURL() },
                fields: [
                    { name: "Suggestion", value: message.content },
                    { name: jaime, value: "**0.00%**", inline: true },
                    { name: jaimePas, value: "**0.00%**", inline: true },
                    { name: "** **", value: ("<:barrerouge:1124831615336599644>").repeat(10) + " **0%**" },

                ],
                footer: { text: "PlaneSky", icon_url: config.application.icon },
                color: config.application.color,
                timestamp: new Date().toISOString()
            }],
            fetchReply: true
        })
        message.delete()
        await suggestionEmbed.react(jaime);
        await suggestionEmbed.react(jaimePas);
        await suggestionEmbed.startThread({
            name: `Suggestion de ${message.author.username}`,
            type: 'GUILD_PUBLIC_THREAD'
        })
    },
    /**
     * @param {Discord.Client} Client
     * @param {Discord.MessageReaction} react
     * @param {Discord.User} user
     */
    manageReactions: async (Client, react, user, type) => {
        let reactJaimeCount = 0, reactJaimepasCount = 0

        if (react.emoji.id == jaime.split(":")[2].split(">").join("")) {
            reactJaimeCount = react.count - 1
            reactJaimeUsers = (react.users.cache.map(user => user.username))
            reactJaimeUsers.splice(reactJaimeUsers.indexOf(Client.user.username), 1)
        } else {
            reactJaimepasCount = react.count - 1
            reactJaimepasUsers = react.users.cache.map(user => user.username)
            reactJaimepasUsers.splice(reactJaimepasUsers.indexOf(Client.user.username), 1)
        }

        if (react.emoji.id == jaime.split(":")[2].split(">").join("")) {
            if (reactJaimepasUsers.includes(user.username) && type == "add") {
                const reaction = react.message.reactions.cache.get(jaimePas.split(":")[2].split(">").join(""))
                reaction.users.remove(user)
            }
        } else {
            if (reactJaimeUsers.includes(user.username) && type == "add") {
                const reaction = react.message.reactions.cache.get(jaime.split(":")[2].split(">").join(""))
                reaction.users.remove(user)
            }
        }

        let reactions = react.message.reactions.cache.map(r => { return r }).filter(r => r.emoji.name == 'jenaimepas' || r.emoji.name == 'jaime')
        let [react1, react2] = reactions
        let reactAllCount = (react1.count - 1 + react2.count - 1)
        let react1Count = Number((react1.count - 1) / reactAllCount * 100).toFixed(2)
        let react2Count = Number((react2.count - 1) / reactAllCount * 100).toFixed(2)
        let oldEmbed = react.message.embeds[0]

        let reactJaimeBarresNumber = Math.round(react1Count / 10)
        let reactJaimePasBarresNumber = 10 - reactJaimeBarresNumber
        let barresVertes = "", barresRouges = ""

        for(let i = 0; i < reactJaimeBarresNumber; i++) {
            barresVertes += "<:barreverte:1124831296909225994>"
        }
        for(let i = 0; i < reactJaimePasBarresNumber; i++) {
            barresRouges += "<:barrerouge:1124831615336599644>"
        }

        if(!barresVertes && !barresRouges) barresRouges = ("<:barrerouge:1124831615336599644>").repeat(10)

        await react.message.edit({
            embeds: [{
                author: oldEmbed.author,
                fields: [
                    oldEmbed.fields[0],
                    { name: jaime, value: `**${isNaN(react1Count) ? "0.00" : react1Count}%**`, inline: true },
                    { name: jaimePas, value: `**${isNaN(react2Count) ? "0.00" : react2Count}%**`, inline: true },
                    { name: "** **", value: barresVertes + barresRouges + ` **${isNaN(react1Count) ? "0.00" : react1Count}%**` }
                ],
                footer: oldEmbed.footer,
                color: oldEmbed.color,
                timestamp: oldEmbed.timestamp,
            }]
        })
    }
}
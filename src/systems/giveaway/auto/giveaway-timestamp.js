const Discord = require('discord.js')
const JsonEditor = require('./../../../utils/JsonEditor.js')
const editJsonFile = require('edit-json-file')

module.exports = {
    /**
     * @param {Discord.Client} Client
     * @param {Discord.CommandInteraction} interaction 
     */
    execute: async (Client) => {
        // Giveaway Introuvable
        // let idChannel = JsonEditor.get()
        // let str = '';

        // for (let i = 0; i < 1; i++) {
        //     console.log(editJsonFile(`${process.cwd()}/src/systems/giveaway/storage/data.json`).read())
        // }
        // try {
        //     await Client.channels.cache.get("872174178462224384").messages.fetch({ message: "1104386833695129700" })
        // } catch {
        //     console.log("Error")
        // }
    }
}
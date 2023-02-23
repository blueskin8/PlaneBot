const Discord = require('discord.js')
const fs = require('fs')
const config = require('../../../config')

/**
 * Ajouter une ligne de log
 * @param {Discord.Client} Client
 */
module.exports = class {
    /**
     * @param {String} service 
     * @param {String} message 
     */
    constructor(service = "INFO", message) {
        if(!message) throw "LogLine.js : Le paramètre 'message' est obligatoire"
        fs.appendFile('./logs/latest.log', `\n[${new Date().toLocaleString()}] [${service}] ${message}`, (err) => {
            if(err) throw err
            console.log(`[${new Date().toLocaleString()}] [${service}] ${message}`)
        })
    }
}
const Discord = require('discord.js')
const fs = require('fs')
const config = require('../../../config')

/**
 * Quand le bot se lance
 * sert à initialiser les logs
 * @param {Discord.Client} Client
 */
module.exports.initLogs = (Client) => {
    fs.readFile('./logs/latest.log', (err, data) => {
        if(err) throw err
        const date = data.toString().split('\n')[0]
        const fileName = date.replaceAll(' ', '+').replaceAll(':', '-').replaceAll('/', '-')
        fs.writeFile('./logs/' + fileName + ".log", data.toString(), (err) => {
            if(err) throw err
            fs.writeFile('./logs/latest.log', `${new Date().toLocaleString()}\n[${new Date().toLocaleString()}] [LogSystem] Système de logs initialisé`, (err) => {
                if(err) throw err
            })
        })
    })
}
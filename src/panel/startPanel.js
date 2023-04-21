const express = require('express')
const fs = require('fs')
const config = require('../../config')
const LogLine = require('../systems/logs/LogLine')

const app = express()
const port = 3000

app.use((req, res, next) => {
    let ip = req.ip
    if(config.panel.validIPs.includes(ip)) {
        next()
    } else {
        res.send('Vous n\'êtes pas autorisé à acceder au panel')
    }
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/configfile', (req, res) => {
    res.send(config)
})
app.get('/easter-egg', (req, res) => {
    res.send('Voici un easter-egg, il sert a rien mais il est là quand même')
})

app.use(express.static(__dirname + "/"))
app.use(express.static(__dirname + "/configfile"))
app.use(express.static(__dirname + "/easter-egg"))

const server = app.listen(port, () => {
    new LogLine('Panel', 'Panel lancé sur le port ' + port + " : http://localhost:" + port)
})
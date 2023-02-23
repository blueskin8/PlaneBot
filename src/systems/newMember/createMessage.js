const Discord = require('discord.js')
const config = require('../../../config')
const canvas = require('canvas').createCanvas(1920, 1080), Canvas = require('canvas')

module.exports = {
    /**
     * Pour generer un message de bienvenue
     * @param {Discord.Client} Client
     * @param {Discord.GuildMember} member
     */
    generate: async (Client, member, thisChannel, channel) => {

        const bienvenueMessage = `
Bienvenue **<@${member.id}>** sur PlaneSky 🎉
▪ Grâce à toi nous sommes désormais ${member.guild.memberCount} membres !
        `

        let ctx = canvas.getContext('2d')
        let background = await Canvas.loadImage("./src/assets/fond.png")
        ctx.drawImage(background, 0, 0, 1920, 1080)
        
        ctx.font = "90px Mochiy pop one"
        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "left"
        ctx.fillText(member.user.username, 980, 755)
    
        ctx.font = "50px Mochiy pop one"
        ctx.fillText("Vous êtes le " + member.guild.memberCount + "ème membre", 100, 1000)
        
        let avatar = await Canvas.loadImage(member.displayAvatarURL({ extension: "png", size: 1024 }))
    
        ctx.arc(465, 538, 312, 0, Math.PI * 2, false)
        ctx.clip()
        ctx.drawImage(avatar, 105, 178, 720, 720)
        let attachement = new Discord.AttachmentBuilder(canvas.toBuffer(), "welcome.png")
    
        //if(thisChannel == true || channel) return channel.send({ content: bienvenueMessage, files: [attachement] })
        Client.channels.cache.get(config.configuration.bienvenueChannel).send({ content: bienvenueMessage, files: [attachement] })
    }
}
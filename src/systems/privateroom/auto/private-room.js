const Discord = require('discord.js')
const config = require('../../../../config')
/**
 * Quand un membre rejoint le salon privé
 * @param {Discord.Client} Client
 * @param {Discord.VoiceState} oldState
 * @param {Discord.VoiceState} newState
 */
module.exports = async (Client, oldState, newState) => {
  const privateroom = Client.channels.cache.get(config.configuration.privatevoice)
  const everyone = oldState.guild.roles.everyone.id
  oldState.guild.channels.create({
    name: `🔊 ${privateroom.members.toJSON()[0].user.username} | Salon privé 🔒`,
    type: Discord.ChannelType.GuildVoice,
    parent: privateroom.parentId,
    permissionOverwrites: [
      {
        id: privateroom.members.toJSON()[0].user.id,
        allow: ["Connect", "ManageChannels", "CreateInstantInvite", "ManageMessages", "PrioritySpeaker", "UseSoundboard"]
      },
      {
        id: everyone,
        allow: ["Speak", "Stream", "ReadMessageHistory"],
        deny: ["Connect", "ViewChannel", "CreateInstantInvite", "UseApplicationCommands"]
      },
      { // @Aventurier
        id: "872174151257980929",
        allow: ["ViewChannel", "SendMessages", "AddReactions", "UseExternalEmojis", "UseExternalStickers"]
      }
    ]
  }).then((ch) => {
    // do {
    //   try {
    privateroom.members.toJSON()[0].voice.setChannel(ch)
    //   } catch (err) {

    //   }
    // } while (newState.channelId != config.configuration.privatevoice)
  })
}
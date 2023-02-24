const Discord = require('discord.js')
const config = require('../../../config.js')
const LogLine = require('../../systems/logs/LogLine')

/**
 * Quand il y a une interaction avec un channel vocal
 * @param {Discord.Client} Client
 * @param {Discord.VoiceState} oldState
 * @param {Discord.VoiceState} newState
 */
module.exports = (Client, oldState, newState) => {

  if (oldState.channelId === newState.channelID) {
    // console.log('a user has not moved!')
  }
  if (oldState.channelId != null && newState.channelId != null && newState.channelId != oldState.channelId) {
    // console.log('a user switched channels')
    if (newState.channelId == config.configuration.privatevoice) {
      if (newState.channelId == config.configuration.privatevoice) {
        require('../../systems/privateroom/auto/private-room')(Client, oldState, newState)
      }
    } else {
      newState.guild.channels.cache.get(config.configuration.privatevoice).parent.children.cache.forEach((ch) => {
        if (ch.name.includes('Salon de')) {
          if (!ch.members.toJSON()[0]) {
            ch.delete()
          }
        }
      })
    }
  }
  if (oldState.channelId === null) {
    // console.log('a user joined!')
    if (newState.channelId == config.configuration.privatevoice) {
      require('../../systems/privateroom/auto/private-room')(Client, oldState, newState)
    }
  }
  if (newState.channelId === null) {
    // console.log('a user left!')
    newState.guild.channels.cache.get(config.configuration.privatevoice).parent.children.cache.forEach((ch) => {
      if (ch.name.includes('Salon de')) {
        if (!ch.members.toJSON()[0]) {
          ch.delete()
        }
      }
    })
  }
}
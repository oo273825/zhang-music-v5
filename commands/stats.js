const { MessageEmbed } = require("discord.js");
require("moment-duration-format");
const cpuStat = require("cpu-stat");
const moment = require("moment");

module.exports = {
  name: "stats",
  description: "獲取有關張先生的所有信息",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["about", "ping", "info"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message) => {
    const { version } = require("discord.js");
    cpuStat.usagePercent(async function (err, percent, seconds) {
      if (err) {
        return console.log(err);
      }
      const duration = moment
        .duration(message.client.uptime)
        .format(" D[d], H[h], m[m]");

      const embed = new MessageEmbed();
      embed.setColor(client.botconfig.EmbedColor);
      embed.setTitle(`關於 \`${client.user.username}\` 所有的所有`);
      embed.addFields(
        {
          name: ":goat: Ping",
          value: `┕\`${Math.round(client.ws.ping)}ms\``,
          inline: true,
        },
        {
          name: ":clock1: 上線時間",
          value: `┕\`${duration}\``,
          inline: true,
        },
        {
          name: ":tada: 紀念日",
          value: `┕\`11月25日\``,
          inline: true,
        }
      );

      embed.addFields(
        {
          name: ":poop: 代號",
          value: `┕\`F\``,
          inline: true,
        },
        {
          name: ":flag_tw: 編碼",
          value: `┕\`130376371\``,
          inline: true,
        },
        {
          name: ":microphone: 最想當",
          value: `┕\`歌手\``,
          inline: true,
        }
      );

      return message.channel.send(embed);
    });
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction) => {
      const { version } = require("discord.js");
      cpuStat.usagePercent(async function (err, percent, seconds) {
        if (err) {
          return console.log(err);
        }
        const duration = moment
          .duration(client.uptime)
          .format(" D[d], H[h], m[m]");

        const embed = new MessageEmbed();
        embed.setColor(client.botconfig.EmbedColor);
        embed.setTitle(`關於 \`${client.user.username}\` 所有的所有`);
        embed.addFields(
        {
          name: ":goat: Ping",
          value: `┕\`${Math.round(client.ws.ping)}ms\``,
          inline: true,
        },
        {
          name: ":clock1: 上線時間",
          value: `┕\`${duration}\``,
          inline: true,
        },
        {
          name: ":tada: 紀念日",
          value: `┕\`11月25日\``,
          inline: true,
        }
      );

      embed.addFields(
        {
          name: ":poop: 代號",
          value: `┕\`F\``,
          inline: true,
        },
        {
          name: ":flag_tw: 編碼",
          value: `┕\`130376371\``,
          inline: true,
        },
        {
          name: ":microphone: 最想當",
          value: `┕\`歌手\``,
          inline: true,
        }
      );

        return interaction.send(embed);
      });
    },
  },
};

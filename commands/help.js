const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "查看張先生的所有功能",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(
        ` ${client.user.username} 的所有指令`,
        client.botconfig.IconURL
      )
      .setColor(client.botconfig.EmbedColor)
      .setFooter(
        `獲得每項指令信息 -使用 ${
          GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }help [Command] | 祝你有個美好的屁眼日!`
      ).setDescription(`${Commands.join("\n")}
  
  
  [:angel: Follow我](https://www.instagram.com/chen.y32/) | [Vlog](https://www.youtube.com/channel/UC1KP1wS1JoFtDfhcgt87pow) | [最愛的歌](https://www.youtube.com/watch?v=v7y2Xdg_MZ8) | By [Daniel  Hung](https://danielhung4857.webnode.tw/)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(
          message.channel,
          `❌ | Unable to find that command.`
        );

      let embed = new MessageEmbed()
        .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Usage",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

  SlashCommand: {
    options: [
      {
        name: "command",
        description: "取得特定命令的訊息",
        value: "command",
        type: 3,
        required: false,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */

    run: async (client, interaction, args, { GuildDB }) => {
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );

      let Embed = new MessageEmbed()
        .setAuthor(
          ` ${client.user.username} 的所有指令`,
          client.botconfig.IconURL
        )
        .setColor(client.botconfig.EmbedColor)
        .setFooter(
          `獲得每項指令信息 -使用 ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }help [Command] | 祝你有個美好的屁眼日!`
        ).setDescription(`${Commands.join("\n")}
  
  
  [:angel: Follow我](https://www.instagram.com/chen.y32/) | [Vlog](https://www.youtube.com/channel/UC1KP1wS1JoFtDfhcgt87pow) | [最愛的歌](https://www.youtube.com/watch?v=v7y2Xdg_MZ8) | By [Daniel  Hung](https://danielhung4857.webnode.tw/)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args[0].value)
          );
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | 無法找到該命令`
          );

        let embed = new MessageEmbed()
          .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Aliases", cmd.aliases.join(", "), true)
          .addField(
            "Usage",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Permissions",
            "Member: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Prefix - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );

        interaction.send(embed);
      }
    },
  },
};

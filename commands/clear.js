const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "clear",
  description: "清除播放隊列",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["cl", "cls"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **現在沒有播放的曲目...**"
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(
        message.channel,
        "❌ | **現在沒有播放的曲目...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **你必須先加入語音頻道!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        "❌ | **你必須和張先生在同一個語音頻道才能使用這個命令!**"
      );
    player.queue.clear();
    await client.sendTime(message.channel, "✅ | **成功清除播放隊列!**");
  },

  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | 你必須先加入語音頻道!"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          "❌ | **你必須和張先生在同一個語音頻道才能使用這個命令!**"
        );
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **現在沒有播放的曲目...**"
        );

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime(
          interaction,
          "❌ | **現在沒有播放的曲目...**"
        );
      player.queue.clear();
      await client.sendTime(interaction, "✅ | **成功清除播放隊列!**");
    },
  },
};

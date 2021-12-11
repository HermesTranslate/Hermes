import type { ArgsOf } from "discordx";
import { Discord, On, Client } from "discordx";
import { Auto } from "../db/auto.schema.js"
import { TranslateClient } from "../utils/translate.js"

@Discord()
export abstract class AppDiscord {
  @On("messageCreate")
  async onMessage([message]: ArgsOf<"message">, client: Client) {
    if (message.author.bot) return;
    if (!message.guild) return;
    let data = await Auto.findOne({
      userId: message.author.id,
      guildId: message.guild.id
    })
    if (data) {
      let result = await TranslateClient.translate("en", data.lang, message.content);
      await message.channel.send(result)
    }
  }
}

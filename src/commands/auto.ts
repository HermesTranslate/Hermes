import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption, SlashChoice } from "discordx";
import { Auto } from "../db/auto.schema.js"
import { LangChoices } from "../utils/langChoices.js"

@Discord()
class AutoCommand {
  @Slash("auto")
  async auto(
    @SlashChoice(LangChoices)
    @SlashOption("lang", {
      required: true,
      description: "the language",
      type: "STRING"
    })
    langCode: string,
    interaction: CommandInteraction
  ) {
      let query = {
        userId: interaction.member.user.id,
        guildId: interaction.guildId,
        lang: langCode
      }
      let data = await Auto.findOneAndUpdate(query, query, { new: true, upsert: true })
      interaction.reply(`Lang code "${langCode}" has been added for member ${interaction.member.user.id} and guild ${interaction.guildId}`);
    }
}

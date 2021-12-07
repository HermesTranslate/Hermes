import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption, SlashChoice } from "discordx";
import { LangChoices } from "../utils/langChoices.js"
import { TranslateClient } from "../utils/translate.js"

@Discord()
class TranslateCommand {
  @Slash("ping") {
        const embed = new MessageEmbed()
        .setTitle('HERMES - System Response')
        .setColor('RED')
        .setDescription(`Latency is **${Date.now() - interaction.createdTimestamp}ms.**`)
        interaction.reply(embed: [ embed ]);
    }
}

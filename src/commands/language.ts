import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import { Pagination } from "@discordx/utilities";
import { LangChoices } from "../utils/langChoices.js"

@Discord()
class LanguageCommand {
  @Slash("languages", { description: "Show supported languages" })
  async languages(interaction: CommandInteraction): Promise<void> {
    let pageLength = 10;
    var pageCount = 0;
    var langPages = []
    var lines = [];
    for(var k in LangChoices){
      if(pageCount === pageLength){
        langPages.push(lines.join("\n"))
        lines = [];
      }
      var v = LangChoices[k as keyof typeof LangChoices];
      lines.push(`${k} - \`${v}\``);
      pageCount += 1;
    }

    langPages.push(lines.join("\n"))

    const pages = langPages.map((txt, i) => {
      return new MessageEmbed()
        .setFooter(`Page ${i + 1} of ${langPages.length}`)
        .setTitle("**Supported Languages**")
        .setDescription(txt)
    });

    const pagination = new Pagination(interaction, pages);
    await pagination.send();
  }
}

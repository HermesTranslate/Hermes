import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption, SlashChoice } from "discordx";
import { LangChoices } from "../utils/langChoices.js"
import { TranslateClient } from "../utils/translate.js"

@Discord()
class TranslateCommand {
  @Slash("translate")
  async translate(
    @SlashChoice(LangChoices)
    @SlashOption("lang", {
        required: true,
        description: "the language",
        type: "STRING"
    })
    langCode: string,
    @SlashOption("text", {
        required: true,
        description: "the text to translate",
        type: "STRING"
    })
    textToTranslate: string,
    interaction: CommandInteraction
  ) {
        let detectedLang = await TranslateClient.detect(textToTranslate);
        if(detectedLang == langCode) {
            interaction.reply(`Error: Source language is the same as target (${langCode} -> ${detectedLang})`);
            return;
        }
        let result = await TranslateClient.translate(detectedLang, langCode, textToTranslate);
        interaction.reply(result);
    }
}
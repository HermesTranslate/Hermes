import { CommandInteraction } from "discord.js";
import { Discord, Slash, SlashOption, SlashChoice } from "discordx";
import { LangChoices } from "../utils/langChoices.js"
import { TranslateClient } from "../utils/translate.js"

@Discord()
class TranslateCommand {
  @Slash("translate")
  async translate(
    @SlashChoice(LangChoices)
    @SlashOption("target", {
        required: true,
        description: "the target language",
        type: "STRING"
    })
    targetLang: string,
    @SlashOption("text", {
        required: true,
        description: "the text to translate",
        type: "STRING"
    })
    textToTranslate: string,
    @SlashChoice(LangChoices)
    @SlashOption("source", {
        required: false,
        description: "the source language",
        type: "STRING"
    })
    sourceLang: string,
    interaction: CommandInteraction
  ) {
       var detectedLang = sourceLang;
       console.log(detectedLang);
        if(!detectedLang){
            detectedLang = await TranslateClient.detect(textToTranslate);
            if(detectedLang == targetLang) {
                interaction.reply(`Error: Source language is the same as target (${targetLang} -> ${detectedLang})`);
                return;
            }
        }
        let result = await TranslateClient.translate(detectedLang, targetLang, textToTranslate);
        interaction.reply(result);
    }
}
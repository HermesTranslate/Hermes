import { CommandInteraction, AutocompleteInteraction } from "discord.js";
import { Discord, Slash, SlashOption, SlashChoice } from "discordx";
import { LangChoices } from "../utils/langChoices.js"
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

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
        const json = JSON.stringify({"q": textToTranslate, "source": "en", "target": langCode});
        const response = await axios.post(process.env.TRANSLATE_API_URI!, json, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            interaction.reply(res.data.translatedText);
        })
    }
}
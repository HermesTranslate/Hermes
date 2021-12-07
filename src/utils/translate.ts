import "reflect-metadata";
import { LangChoices } from "../utils/langChoices.js"
import axios from "axios";

export class TranslateClient {
    static async translate(src: string, dest: string, text: string) : Promise<string> {
        const json = JSON.stringify({"q": text, "source": src, "target": dest});
        return axios.post(process.env.TRANSLATE_API_URI!, json, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data.translatedText
        })
    }
}


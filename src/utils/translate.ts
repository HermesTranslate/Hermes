import "reflect-metadata";
import { LangChoices } from "../utils/langChoices.js"
import axios from "axios";

export class TranslateClient {
    static async translate(src: string, dest: string, text: string) : Promise<string> {
        const json = JSON.stringify({"q": text, "source": src, "target": dest});
        return axios.post(`${process.env.TRANSLATE_API_URI!}/translate`, json, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.data.translatedText
        })
    }

    static async detect(text: string) : Promise<string> {
        const json = JSON.stringify({"q": text});
        return axios.post(`${process.env.TRANSLATE_API_URI!}/detect`, json, {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            var highestConf = -1;
            var highestLang = "en";
            console.log(res.data);
            for(var d of res.data){
                if(d["confidence"] > highestConf) {
                    highestConf = d["confidence"];
                    highestLang = d["language"];
                }
            }
            return highestLang
        })
    }
}


import { ICommand } from "wokcommands";
import axios from "axios";
import { MessageEmbed } from "discord.js";

export default{
    category: "General",
    slash: false,
    description: "cat.",

    callback: async () => {
        const embed = await axios.get("https://api.thecatapi.com/v1/images/search")
        .then(res => {
            const data:any = res.data
            const embed = new MessageEmbed()
            .setColor("#8dde0b")
            .setImage(data[0]["url"]);
            return embed
        })

        return embed
    }
} as ICommand
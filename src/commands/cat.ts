import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash } from "discordx";
import axios from "axios";

@Discord()
class CatCommand {
  @Slash("cat")
  async cat(
    interaction: CommandInteraction
  ) {
        const d = await axios.get("https://api.thecatapi.com/v1/images/search")
        .then(res => {
            const data:any = res.data
            const embed = new MessageEmbed()
            .setColor("#8dde0b")
            .setImage(data[0]["url"]);
            //return embed
            interaction.reply({embeds: [embed]});
            //return this.message.reply({ embeds: [embed] });
        })
        
    }
}


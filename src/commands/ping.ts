import { CommandInteraction, MessageEmbed } from "discord.js";
import { Discord, Slash} from "discordx";

@Discord()
class ping {
  @Slash("ping") 
  async ping(interaction: CommandInteraction) {
    const embed = new MessageEmbed()
    .setTitle('HERMES - System Response')
    .setColor('RED')
    .setDescription(`Latency is **${Date.now() - interaction.createdTimestamp}ms.**`)
    interaction.reply({embeds: [embed]});
  }
}

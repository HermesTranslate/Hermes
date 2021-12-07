import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with Pong!',
    slash: 'both',
    testOnly: true,

    callback: ({ message, interaction }) => {
        const embed = new MessageEmbed()
        .setTitle('HERMES - System Response')
        .setColor('RED')
        .setDescription(`Latency is **${interaction? Date.now() - interaction.createdTimestamp: Date.now() - message.createdTimestamp}ms.**`)
        return embed
    }
} as ICommand

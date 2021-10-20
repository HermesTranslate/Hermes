import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with Pong!',
    slash: 'both',
    testOnly: true,

    callback: ({ message, interaction }) => {
        //return 'Pong!'
        if (interaction) {
            return 'Pong! - For more information, please run !ping'
        }else if (message) {
            message.reply(`Latency is **${Date.now() - message.createdTimestamp}ms.**`);
        }
    }
} as ICommand


import { MessageActionRow, MessageButton } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    description: "a demo of buttons",
    category: "Testing",
    testOnly: true,
    slash: false,
    
    // this is a button demonstration. Delete later if you want

    callback: async ({message}) => {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("punch")
            .setLabel("punch")
            .setStyle("PRIMARY")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("kick")
            .setLabel("kick")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("slap")
            .setLabel("slap")
            .setStyle("DANGER")
        )

        const filter = (btn:any) => {
            return btn.user.id === message.author.id
        }

        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 3,
            time: 120000
        })

        collector.on("collect", async(i) =>{
            switch(i.customId){
                case "punch":
                    await i.update("ow")
                    break
                case "kick":
                    await i.update("AAA-")
                    break
                case "slap":
                    await i.update("fuc-")
                    break
            }
        })

        collector.on("end", async(i) => {
            let summary = "action summary:\n"
            i.forEach(action => {
                summary += action.customId + " \n"
            })
            await reply.edit({content: summary, components: []})
        })

        const reply = await message.reply({content: "Hello it is I \na dipshit", components: [row]})
    }
} as ICommand
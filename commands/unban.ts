import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Unban a member',
    slash: false,
    testOnly: false,
    permissions: ["BAN_MEMBERS"],
    expectedArgs: "<target>",
    minArgs: 1,

    callback: ({ message, args }) => {
        const tag = args.shift();
        if (!tag) return "please provide a member to unban"
        const memberid = tag.includes("<@!") ? tag.replace("<@!", "").replace(">", "")
        : tag.replace("<@", "").replace(">", "");
        const reason = args.join(" ");
        message.guild?.bans.fetch(memberid).then(member=>{
            message.guild?.members.unban(memberid, `Unbanned by ${message.author.username} \nReason: ${reason}`).then(()=>{
                message.reply(`Unbanned <@${memberid}>`)
            }).catch(()=>{
                message.reply("Unable to unban given member");
            })
        }).catch(()=>{
            message.reply("Could not find banned user");
        })
    }
} as ICommand
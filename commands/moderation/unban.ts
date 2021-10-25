import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Unban a member',
    slash: "both",
    testOnly: false,
    permissions: ["BAN_MEMBERS"],
    expectedArgs: "<member> [reason]",
    minArgs: 1,

    callback: ({ message, interaction, args }) => {
        const msg = message? message: interaction
        const username = message? message.author.username: interaction.member?.user.username
        const tag = args.shift();
        if (!tag) return "please provide a member to unban"
        const memberid = tag.includes("<@!") ? tag.replace("<@!", "").replace(">", "")
        : tag.replace("<@", "").replace(">", "");
        const reason = args.join(" ");
        msg.guild?.bans.fetch(memberid).then(()=>{
            msg.guild?.members.unban(memberid, `Unbanned by ${username} \nReason: ${reason}`).then(()=>{
                msg.reply(`Unbanned <@${memberid}>`)
            }).catch(()=>{
                msg.reply("Unable to unban given member");
            })
        }).catch(()=>{
            msg.reply("Could not find banned user");
        })
    }
} as ICommand
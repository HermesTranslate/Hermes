import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kick a member',
    slash: false,
    testOnly: false,
    permissions: ["KICK_MEMBERS"],
    expectedArgs: "<target> [reason]",
    minArgs: 1,

    callback: ({ message, args }) => {
        const tag = args.shift();
        if (!tag) return "please provide a member to kick"
        const memberid = tag.includes("<@!") ? tag.replace("<@!", "").replace(">", "")
        : tag.replace("<@", "").replace(">", "");
        const reason = args.join(" ");
        message.guild?.members.fetch(memberid).then(member=>{
            member.kick(`Kicked by ${message.author.username} \nReason: ${reason}`).then(()=>{
                message.reply(`Kicked <@${memberid}>`);
            }).catch(()=>{
                message.reply(`Could not kick the specified member`);
            })
        }).catch(()=>{
            message.reply("Could not find specified member");
        })
    }
} as ICommand
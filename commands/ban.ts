import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Ban a member',
    slash: false,
    testOnly: false,
    permissions: ["BAN_MEMBERS"],
    expectedArgs: "<target> [reason]",
    minArgs: 1,

    callback: ({ message, args }) => {
        const tag = args.shift();
        if (!tag) return "please provide a member to ban"
        const memberid = tag.includes("<@!") ? tag.replace("<@!", "").replace(">", "")
        : tag.replace("<@", "").replace(">", "");
        const reason = args.join(" ");
        message.guild?.members.fetch(memberid).then(member=>{
            member.ban({reason: `Banned by ${message.author.username} \nReason: ${reason}`, days: 5}).then(()=>{
                message.reply(`Banned <@${memberid}>`);
            }).catch(()=>{
                message.reply(`Could not ban the specified member`);
            })
        }).catch(()=>{
            message.reply("Could not find specified member");
        })
    }
} as ICommand
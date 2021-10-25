import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Ban a member',
    slash: "both",
    testOnly: false,
    permissions: ["BAN_MEMBERS"],
    expectedArgs: "<target> [reason]",
    minArgs: 1,

    callback: ({ message, interaction, args }) => {
        const msg = message? message: interaction
        const username = message? message.author.username: interaction.member?.user.username
        const tag = args.shift();
        if (!tag) return "please provide a member to ban"
        const memberid = tag.includes("<@!") ? tag.replace("<@!", "").replace(">", "")
        : tag.replace("<@", "").replace(">", "");
        const reason = args.join(" ");
        msg.guild?.members.fetch(memberid).then(member=>{
            member.ban({reason: `Banned by ${username} \nReason: ${reason}`, days: 5}).then(()=>{
                msg.reply(`Banned <@${memberid}>`);
            }).catch(()=>{
                msg.reply(`Could not ban the specified member`);
            })
        }).catch(()=>{
            msg.reply("Could not find specified member");
        })
    }
} as ICommand
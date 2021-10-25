import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kick a member',
    slash: "both",
    testOnly: false,
    permissions: ["KICK_MEMBERS"],
    expectedArgs: "<target> [reason]",
    minArgs: 1,

    callback: ({ message, interaction, args }) => {
        const msg = message? message: interaction
        const username = message? message.author.username: interaction.member?.user.username
        const tag = args.shift();
        if (!tag) return "please provide a member to kick"
        const memberid = tag.includes("<@!") ? tag.replace("<@!", "").replace(">", "")
        : tag.replace("<@", "").replace(">", "");
        const reason = args.join(" ");
        msg.guild?.members.fetch(memberid).then(member=>{
            member.kick(`Kicked by ${username} \nReason: ${reason}`).then(()=>{
                msg.reply(`Kicked <@${memberid}>`);
            }).catch(()=>{
                msg.reply(`Could not kick the specified member`);
            })
        }).catch(()=>{
            msg.reply("Could not find specified member");
        })
    }
} as ICommand
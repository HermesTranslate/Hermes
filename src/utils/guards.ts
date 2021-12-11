import { GuardFunction, ArgsOf, SimpleCommandMessage } from "discordx";
import {
  ButtonInteraction,
  CommandInteraction,
  ContextMenuInteraction,
  Message,
  MessageReaction,
  SelectMenuInteraction
} from "discord.js";
import { Banned } from "../db/banned.schema.js"

export const NotBanned: GuardFunction<
  ArgsOf<"messageCreate" | "messageReactionAdd">
  | CommandInteraction
  | ContextMenuInteraction
  | SelectMenuInteraction
  | ButtonInteraction
  | SimpleCommandMessage
> = async (
  arg, client, next, guardDatas
) => {
  const argObj = arg instanceof Array ? arg[0] : arg;
  const user =
    argObj instanceof CommandInteraction
      ? argObj.user
      : argObj instanceof MessageReaction
      ? argObj.message.author
      : argObj instanceof Message
      ? argObj.author
      : argObj instanceof SimpleCommandMessage
      ? argObj.message.author
      : argObj instanceof CommandInteraction ||
        argObj instanceof ContextMenuInteraction ||
        argObj instanceof SelectMenuInteraction ||
        argObj instanceof ButtonInteraction
      ? argObj.member?.user
      : argObj.message.author;

  if (user) {
    let data = await Banned.findOne({ _id: user.id })
    if (!data) {
      await next();
    }
  }
};

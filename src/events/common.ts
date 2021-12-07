import type { ArgsOf } from "discordx";
import { Discord, On, Client } from "discordx";

@Discord()
export abstract class AppDiscord {
  @On("message")
  onMessage([message]: ArgsOf<"message">, client: Client) {
    console.log("You just sent a message:", message.content);
  }
}
